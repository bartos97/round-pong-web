import { Module } from '../../core/module';
import { HomeScreenController } from './home-screen.controller';
import { ComponentController } from '../../core/component-controller';

require('./home-screen.scss');

const controllers = Module.register('.home-screen', (templateHook: HTMLElement): ComponentController => {
    return new HomeScreenController(templateHook);
});