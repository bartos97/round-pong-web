import { ComponentController } from '../../core/component-controller';

export interface DialogData {
    title: string;
    templateStringified?: string;
    onClose?: () => void;
    saveButtonData?: DialogButtonData;
}

export interface DialogButtonData {
    title?: string;
    onSave: () => void;
}

/**
 * Singleton
 */
export class DialogController extends ComponentController {
    //#region members
    private static _instance: DialogController;
    private _data: DialogData;

    private _elemCloseBtn: HTMLElement;
    private _elemBackdrop: HTMLElement;
    private _elemTitle: HTMLElement;
    private _elemContent: HTMLElement;
    private _elemButtonWrap: HTMLElement;
    //#endregion

    public static get instance(): DialogController {
        return this._instance || (this._instance = new this());
    }

    //#region methods
    public open(data: DialogData): void {
        document.body.style.overflow = 'hidden';
        this._elemBackdrop.hidden = false;

        this._data = data;
        this._elemTitle.innerHTML = this._data.title || 'Dialog';
        this._elemContent.innerHTML = this._data.templateStringified || '';
        this._elemCloseBtn.hidden = !this._data.onClose;

        if (!!this._data.saveButtonData?.onSave) {
            let button = document.createElement('button');
            button.classList.add('button', 'success');
            button.innerHTML = this._data.saveButtonData.title || 'OK';
            button.addEventListener('click', () => {
                this._data.saveButtonData.onSave();
                this.onClose();
            });
            this._elemButtonWrap.append(button);
        }
    }

    private constructor() {
        super(document.querySelector('.dialog-backdrop'));
        this._elemCloseBtn = this.getElement('.close-button');
        this._elemBackdrop = this.TEMPLATE;
        this._elemContent = this.getElement('.content');
        this._elemTitle = this.getElement('.title');
        this._elemButtonWrap = this.getElement('.button-wrap');

        this.registerEvent(this._elemCloseBtn, 'click', this.onClose);
    }

    private onClose(event?: Event): void {
        if (!!event) event.stopPropagation();

        document.body.style.overflow = 'auto';
        this._elemBackdrop.hidden = true;
        this._elemTitle.innerHTML = '';
        this._elemContent.innerHTML = '';
        
        this.clearButtonWrap();
        if (this._data.onClose) this._data.onClose();
    }

    private clearButtonWrap() {
        let node = this._elemButtonWrap;
        while(node.hasChildNodes()) {
            node.removeChild(node.firstChild);
        }
    }
    //#endregion
}