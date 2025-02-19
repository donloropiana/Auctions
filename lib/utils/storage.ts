import { createClient } from '@/lib/supabase/server';

export async function uploadListingImages(listingId: number, userId: string, files: File[]) {
  const supabase = await createClient();
  const results = [];

  const folderPath = `/listings/${listingId}/`;

  console.log('Starting upload for files:', files);

  for (const file of files) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      console.log('Uploading file:', {
        fileName,
        folderPath,
        fileSize: file.size,
        fileType: file.type
      });

      const { error: uploadError, data } = await supabase.storage
        .from('auctions_public')
        .upload(`listings/${listingId}/${fileName}`, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('Upload successful:', data);

      results.push({
        file_name: fileName,
        folder_path: folderPath,
        user_id: userId
      });
    } catch (error) {
      console.error('Error in file upload:', error);
      throw error;
    }
  }

  return results;
}