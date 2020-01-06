import { ComponentController } from '../../core/component-controller';
import { DialogController, DialogData } from '../dialog/dialog.controller';

export class GameScreenController extends ComponentController {
    private dialog: DialogController;

    constructor(templateHook: HTMLElement) {
        super(templateHook);
        this.dialog = DialogController.instance;
    }
}