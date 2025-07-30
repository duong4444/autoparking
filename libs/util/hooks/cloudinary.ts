import { useState } from 'react'

export const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false)

  const upload = async (fileList: FileList) => {
    setUploading(true)

    try {
      // chuyển FileList sang mảng rồi map từng file -> tạo danh sách Promise
      // (mỗi file là 1 yêu cầu upload riêng biệt)
      const uploadPromises = Array.from(fileList).map(async (file) => {
        const formData = new FormData() // tạo đối tượng FormData cho từng file
        // gửi kèm upload_preset (Cloudinary yêu cầu preset cho cấu hình upload)
        formData.append('file', file)
        formData.append(
          'upload_preset',
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
        )

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          },
        )

        if (!response.ok) {
          throw new Error('Upload failed')
        }
        
        // lấy URL hình ảnh đã đc Cloudinary lưu trữ (secure_url là HTTPS link)
        const data = await response.json()
        const imageUrl = data.secure_url as string

        return imageUrl
      })

      // đợi tất cả file upload xong -> trả về danh sách URL hình ảnh 
      const uploadedImages = await Promise.all(uploadPromises)
      return uploadedImages
    } catch (error) {
      throw new Error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return { upload, uploading }
}
