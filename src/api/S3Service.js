import Axios from '@/api/apiConfig';

const S3Service = {
  getS3image: async dirName => {
    const response = await Axios.get('/s3/download', {
      responseType: 'arraybuffer',
      params: { dirName: encodeURIComponent(dirName + '/') },
    });
    return response.data;
  },
};

export default S3Service;
