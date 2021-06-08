'use strict';

import { environment } from 'src/environments/environment';

const HostName = environment.apibaseUrl;

// Login-register API endpoints
export const loginURL = `${HostName}/auth/login`;
export const registerURL = `${HostName}/auth/register`;
export const checkMailURL = `${HostName}/auth/checkMail`;

// Profile API endpoints
export const profileURL = `${HostName}/user`;
