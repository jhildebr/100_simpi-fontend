import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from "@fortawesome/angular-fontawesome";
import {
    faPlusCircle as fasPlusCircle,
    faImage as fasImage,
    faEllipsisV as fasEllipsisV,
    faBars as fasBars,
    faArrowsAlt as fasArrowsAlt,
    faCircle as fasCircle,
    faPen as fasPen,
    faTrash as fasTrash,
    faCheck as fasCheck,
    faTimes as fasTimes,
    faSpinner as fasSpinner,
    faCircleNotch as fasCircleNotch,
    faShare as fasShare,
    faSearchPlus as fasSearchPlus,
    faSearchMinus as fasSearchMinus,
    faTrashRestore as fasTrashRestore,
    faCaretLeft as fasCaretLeft,
    faCaretRight as fasCaretRight,
    faInfoCircle as fasInfoCircle,
    faShareAlt as fasShareAlt,
    faArrowLeft as fasArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

@NgModule({
    imports: [FontAwesomeModule],
    exports: [FontAwesomeModule],
    declarations: [],
    providers: [],
})
export class CustomFaModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(fasPlusCircle, fasImage, fasEllipsisV, fasBars, fasArrowsAlt,
            fasCircle, fasPen, fasCheck, fasTrash, fasTimes, fasSpinner, fasCircleNotch,
            fasShare, fasSearchPlus, fasSearchMinus, fasTrashRestore, fasCaretLeft,
            fasCaretRight, fasInfoCircle, fasShareAlt, fasArrowLeft);
    }
}
