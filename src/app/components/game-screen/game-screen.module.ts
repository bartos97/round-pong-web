import { Module } from '../../core/module';
import { GameScreenController } from './game-screen.controller';
import { ComponentController } from '../../core/component-controller';

require('./game-screen.scss');

const controllers = Module.register('.game-screen', (templateHook: HTMLElement): ComponentController => {
    return new GameScreenController(templateHook);
});