import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { newArrayError } from 'src/helpers/helper';
import * as _ from 'lodash';
import { BadRequestException } from 'src/helpers/response/badRequest';

@Injectable()
export class ValidateService {

	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

	async validateUser(userDto: any, isCreated = false, user_id = 0) {
		if (_.isEmpty(userDto)) {
			throw new BadRequestException({ code: 'F0001' });
		}
		let errorData: any = {};

		const regexGmail = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g;
		const regexEmail = /^[^\s@!#$%&'*+/=?^_`{|}~-]+@[^\s@!#$%&'*+/=?^_`{|}~-]+\.[^\s@!#$%&'*+/=?^_`{|}~-]+$/;
		const regexPass = /^[a-zA-Z0-9]{6,20}$/g;
		const regexUserName = /^[a-zA-Z0-9]{6,20}$/g;
		const regexPhone = /((09|03|07|08|05|04|\+84|84)+([0-9]{8,9})\b)/g;

		if (isCreated) {
			if (!userDto.username || userDto.username?.trim() == '') {
				errorData.username = newArrayError(errorData.email, 'User name is required');
			} else if (!regexUserName.test(userDto.username)) {
				errorData.username = newArrayError(errorData.email, 'User name is invalid');
			} else {
				let user = await this.userRepository.findOne({
					where: {
						username: userDto.username.trim()
					}
				});
				if (!_.isEmpty(user)) {
					errorData.username = newArrayError(errorData.email, 'Tên tài khoản đã tồn tại');
				}
			}
			if (!regexPass.test(userDto.password)) {
				errorData.password = newArrayError(errorData.password, 'Password is invalid!');
			}
		}

		if (userDto.email) {
			if ((userDto.email.includes('@gma') && !regexGmail.test(userDto.email)) || !regexEmail.test(userDto.email)) {
				errorData.email = newArrayError(errorData.email, 'Email is invalid');
			} else {
				let userEmail: any = await this.userRepository.findOne({ where: { email: userDto.email } });

				if (!_.isEmpty(userEmail)) {
					if(isCreated) {
						errorData.email =  newArrayError(errorData.email, 'Email đã tồn tại');
					}
					else if(userEmail.id === user_id) {
						errorData.email =  newArrayError(errorData.email, 'Email đã tồn tại');
					}
				}
			}
		}

		if (userDto.mobile) {

			if (!regexPhone.test(userDto.mobile)) {
				errorData.mobile = newArrayError(errorData.phone, 'Phone is invalid');
			} else if(isCreated || user_id){
				let user: any = this.userRepository.findOne({
					where: {
						mobile: Like(`%${userDto.mobile}%`),
					}
				});
				if (!_.isEmpty(user)) {
					if(isCreated) {
						errorData.phone =  newArrayError(errorData.phone, 'Số điện thoại đã tồn tại');
					}
					else if(user.id === user_id) {
						errorData.phone =  newArrayError(errorData.phone, 'Số điện thoại đã tồn tại');
					}
				}
			}
		}

		if (!_.isEmpty(errorData)) {
			throw new BadRequestException({ code: 'F0002', message: null, data: errorData });
		}
	}

}
