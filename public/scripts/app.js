import angular from 'angular';
import core from './modules/core';

angular.module('airbnb',[core.name]);

angular.element(document)
	.ready(() => angular.bootstrap(document, ['airbnb']));