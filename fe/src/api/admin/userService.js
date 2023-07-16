import { buildFilter } from "../../common";
import axiosClient from "../axiosClient";

const userApi = {

	async getUsers(params = null) {
		let filters = params ? buildFilter(params) : null;
		return await axiosClient.get(`user`, {params: filters});
	},

	async getUserById(id) {
		return await axiosClient.get(`user/show/${id}`);
	},

	async createUser(data) {
		return await axiosClient.post(`user/create`, data);
	},

	async updateUser(id, data) {
		return await axiosClient.put(`user/update/${id}`, data);
	},

	async deleteUser(id) {
		return await axiosClient.delete(`user/${id}`);
	}


}

export default userApi;