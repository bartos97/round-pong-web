import { Module } from '../../core/module';
import { HomeScreenController } from './home-screen.controller';
import { ComponentController } from '../../core/component-controller';

const controllers = Module.register('.home-screen', (templateHook: Element): ComponentController => {
    return new HomeScreenController(templateHook);
});