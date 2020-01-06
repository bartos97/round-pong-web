import { ComponentController } from '../../core/component-controller';

export interface DialogData {
    title: string;
    templateStringified: string;
    onClose: () => void;
}

export class DialogController extends ComponentController {
    private static _instance: DialogController;
    private _closeBtn: HTMLElement;
    private _backdrop: HTMLElement;
    private _title: HTMLElement;
    private _content: HTMLElement;
    private _data: DialogData;

    public static get instance(): DialogController {
        return this._instance || (this._instance = new this());
    }

    public open(data: DialogData): void {
        document.body.style.overflow = 'hidden';
        this._data = data;
        this._title.innerHTML = this._data.title || 'Dialog';
        this._content.innerHTML = this._data.templateStringified || '';
        this._backdrop.hidden = false;
    }

    private constructor() {
        super(document.querySelector('.dialog-backdrop'));
        this._closeBtn = this.getElement('.close-button');
        this._backdrop = this.TEMPLATE;
        this._content = this.getElement('.content');
        this._title = this.getElement('.title');

        this.regiterEvent(this._closeBtn, 'click', this.onClose);
        this.regiterEvent(this._backdrop, 'click', this.onClose);
    }

    private onClose(event?: Event): void {
        event.stopPropagation();
        document.body.style.overflow = 'auto';
        this._backdrop.hidden = true;
        this._content.innerHTML = '';
        if (this._data.onClose) this._data.onClose();
    }
}