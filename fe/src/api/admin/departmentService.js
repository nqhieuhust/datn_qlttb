import { buildFilter } from "../../common";
import axiosClient from "../axiosClient";

const departmentApi = {

	async getDepartments(params = null) {
		let filters = params ? buildFilter(params) : null;
		return await axiosClient.get(`department/list`, {params: filters});
	},

	async getDepartmentById(id) {
		return await axiosClient.get(`department/show/${id}`);
	},

	async createDepartment(data) {
		return await axiosClient.post(`department/create`, data);
	},

	async updateDepartment(id, data) {
		return await axiosClient.put(`department/update/${id}`, data);
	},

	async deleteDepartment(id) {
		return await axiosClient.delete(`department/${id}`);
	}


}

export default departmentApi;