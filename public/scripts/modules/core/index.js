import angular from 'angular';
import loginController from './controllers/login.controller';

let loginModule = angular.module('airbnb.core',[]);
loginModule.controller(loginController.name, loginController);

export default loginModule;

