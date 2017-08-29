import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ng2-dropdown-treeview';
import { BookService } from './book.service';

@Component({
    selector: 'leo-book',
    template: `
<div class="row">
    <div class="col-12">
        <div class="alert alert-success" role="alert">
            Selected books: {{values}}
        </div>
    </div>
    <div class="col-12">
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" [(ngModel)]="enableButton">
                Check/uncheck to enable/disable dropdown button
            </label>
        </div>
        <div class="form-group row">
            <label for="book-category" class="col-3 col-form-label">Book category</label>
            <div class="col-9">
                <div class="d-inline-block">
                    <leo-dropdown-treeview [config]="config" [items]="items" (selectedChange)="values = $event"
                        [disabled]="!enableButton" [leoDisabledOnSelector]="'button.dropdown-toggle'">
                    </leo-dropdown-treeview>
                </div>
            </div>
        </div>
    </div>
</div>
`, providers: [
        BookService
    ]
})
export class BookComponent implements OnInit {
    enableButton = true;
    items: TreeviewItem[];
    values: number[];
    config: TreeviewConfig = {
        isShowAllCheckBox: true,
        isShowFilter: true,
        isShowCollapseExpand: true,
        maxHeight: 500,
        propagateSelectionUp: true,
        propagateSelectionDown: true,
        allowDataNonLeafe: false
    };

    constructor(
        private service: BookService
    ) { }

    ngOnInit() {
        this.items = this.service.getBooks();
    }
}
