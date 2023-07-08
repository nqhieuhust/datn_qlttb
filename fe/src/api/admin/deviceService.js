import { buildFilter } from "api/common";
import axiosClient from "../axiosClient";

const deviceApi = {

	async getDevices(params = null) {
		let filters = params ? buildFilter(params) : null;
		return await axiosClient.get(`devices`, {params: filters});
	},

	async getDeviceById(id) {
		return await axiosClient.get(`devices/show/${id}`);
	},

	async createDevice(data) {
		return await axiosClient.post(`devices/create`, data);
	},

	async updateDevice(id, data) {
		return await axiosClient.put(`devices/update/${id}`, data);
	},

	async deleteDevice(id) {
		return await axiosClient.delete(`devices/${id}`);
	}
}

export default deviceApi;