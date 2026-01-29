import supabase from "./supabase";

const BUCKET = "cabin-images";
const SIGNED_URL_TTL = 60 * 60; // seconds (1 hour)

export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*');
    console.log("getCabins data:", data);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data: sessionData } = await supabase.auth.getSession();
  console.log("deleteCabin sessionData:", sessionData);
  const accessToken = sessionData?.session?.access_token;
  console.log("deleteCabin accessToken:", accessToken);
  if (!accessToken) throw new Error("No access token found");
  const EDGE_FUNCTION_URL = "https://swsduwfgaciylwefjsay.functions.supabase.co/delete-cabin";
  const response = await fetch(EDGE_FUNCTION_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  });

  console.log("deleteCabin Response:", response);

  const result = await response.json();
  console.log("deleteCabin Result:", result);

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Cabin could not be deleted");
  }

  return result;
}

export async function createCabin(cabinData) {
  const { data, error } = await supabase
    .from("cabins")
    .insert(cabinData)
    .select()
    .single();

  if (error) {
    console.error("createCabin error:", error);
    throw new Error("Cabin could not be created");
  }
  return data;
}

export async function createEditCabin(newCabinData, id) {
  // If no id, create a new cabin
  if (!id) {
    return createCabin(newCabinData);
  }

  // If id is provided, update the existing cabin
  const { data, error } = await supabase
    .from("cabins")
    .update(newCabinData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("createEditCabin update error:", error);
    throw new Error("Cabin could not be updated");
  }
  return data;
}

/**
 * Get the public or signed URL for an image stored in the cabin-images bucket.
 * @param {string} path - The storage path (e.g., "uuid-filename.jpg")
 * @returns {Promise<string|null>} - The public or signed URL, or null if error
 */
export async function getImageUrl(path) {
  if (!path) return null;

  // If path is already a full URL, return it as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Try to get the public URL first (works if bucket is public)
  const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(path);

  if (publicData?.publicUrl) {
    return publicData.publicUrl;
  }

  // If bucket is private, generate a signed URL
  const { data: signedData, error: signedErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL);

    console.log("createSignedUrl path:", path, "Signed URL:", signedData?.signedUrl);

  if (signedErr) {
    console.error("createSignedUrl error:", signedErr);
    return null;
  }
  return signedData?.signedUrl ?? null;
}

/**
 * Upload a file to Supabase Storage (cabin-images bucket).
 * @param {File} file - The file to upload
 * @param {string} destFolder - Optional folder/prefix (e.g., "cabins")
 * @returns {Promise<{path: string, url: string}>} - The storage path and URL
 */

export async function uploadFile(file, destFolder = "") {
  if (!file) throw new Error("No file provided");
  
  const uuid = crypto.randomUUID?.() ?? Date.now().toString();
  const filename = `${uuid}-${file.name.replace(/\s+/g, "_")}`;
  const path = destFolder ? `${destFolder}/${filename}` : filename;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) {
    throw new Error("File upload failed: " + error.message);
  }

  // Return storage path and public/signed URL
  const url = await getImageUrl(path);
  console.log("File uploaded to:", path, "URL:", url);
  return { path, url };
}
