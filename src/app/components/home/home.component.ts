import { Component, ViewEncapsulation } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import plugins from './plugins';
import schema from './schema';
import { images } from '../../data/images';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  editor: Editor;
  form = new FormGroup({
    editorContent: new FormControl()
  });
  images;
  ngOnInit(): void {
    this.images = images;
    this.editor = new Editor({
      schema,
      plugins
    });
  }

  get doc(): AbstractControl {
    return this.form.get('editorContent');
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
