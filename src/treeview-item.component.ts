import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewItem } from './treeview-item';
import { TreeviewConfig } from './treeview-config';
import { TreeviewItemTemplateContext } from './treeview-item-template-context';

@Component({
    selector: 'leo-treeview-item',
    template: `
<div class="treeview-item">
    <template [ngTemplateOutlet]="template"
        [ngOutletContext]="{item: item, toggleCollapseExpand: toggleCollapseExpand, onCheckedChange: onCheckedChange}">
    </template>
    <div *ngIf="!item.collapsed">
        <leo-treeview-item *ngFor="let child of item.children" [item]="child" [template]="template" [config]="config"
            (checkedChange)="onChildCheckedChange(child, $event)">
        </leo-treeview-item>
    </div>
</div>
    `,
    styles: [`
:host {
    display: block;
}
:host /deep/ .fa {
    margin-right: .2rem;
    width: .5rem;
    cursor: pointer;
}
.treeview-item {
    white-space: nowrap;
}
.treeview-item .treeview-item {
    margin-left: 2rem;
}
    `]
})
export class TreeviewItemComponent {
    @Input() template: TemplateRef<TreeviewItemTemplateContext>;
    @Input() item: TreeviewItem;
    @Input() config: TreeviewConfig;
    @Output() checkedChange = new EventEmitter<boolean>();

    toggleCollapseExpand = () => {
        this.item.collapsed = !this.item.collapsed;
    }

    onCheckedChange = () => {
        const checked = this.item.checked;
        if (!_.isNil(this.item.children) && this.config.propagateSelectionDown) {
            this.item.children.forEach(child => child.setCheckedRecursive(checked, true));
        }

        this.checkedChange.emit(checked);
    }

    onChildCheckedChange(child: TreeviewItem, checked: boolean) {
        if ((this.item.checked !== checked) && this.config.propagateSelectionUp) {
            let itemChecked = true;
            for (let i = 0; i < this.item.children.length; i++) {
                if (!this.item.children[i].checked) {
                    itemChecked = false;
                    break;
                }
            }

            this.item.checked = itemChecked;
        }

        this.checkedChange.emit(checked);
    }
}
