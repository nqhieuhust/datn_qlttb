import axios from "axios";
import axiosClient from "../axiosClient";

const uploadApi = {

    async getFile(path) {
        return await axiosClient.get(`upload/${path}`)
    },

	async uploadFile(file) {
		console.log(file);
		const formData = new FormData();
		formData.append( 'file', file);

		return await axios.post(`${process.env.REACT_APP_URL_API}upload/image`, formData, { headers: { 'Accept': 'multipart/form-data' } });
	},
}

export default uploadApi;