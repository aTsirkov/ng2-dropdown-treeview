import { Injectable } from '@angular/core';

@Injectable()
export class TreeviewConfig {
    isShowAllCheckBox = true;
    isShowFilter = false;
    isShowCollapseExpand = false;
    maxHeight = 500;
    propagateSelectionUp = false;
    propagateSelectionDown = false;
    allowDataNonLeafe = false;
}
