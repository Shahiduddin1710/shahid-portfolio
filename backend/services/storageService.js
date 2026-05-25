const supabase = require("../config/supabase");

const BUCKET_NAME = "files";

const uploadFileToStorage = async (fileBuffer, fileName) => {
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, fileBuffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

  return data.publicUrl;
};

const getFileUrl = async (fileName) => {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);

  return data.publicUrl;
};

const getAllFiles = async () => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list("", {
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    throw new Error(`Failed to fetch files: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  return data.map((file) => ({
    name: file.name,
    url: supabase.storage.from(BUCKET_NAME).getPublicUrl(file.name).data.publicUrl,
  }));
};

module.exports = { uploadFileToStorage, getFileUrl, getAllFiles };