/** entry js */
import './fabric.min'
import b64ToBlob from "blueimp-canvas-to-blob";
import tag from './util/tag'
import * as picker from 'a-color-picker'
function MgjGraphicEditor(parentel, opts = {}) {
  if(!parentel) return console.error("Parent element is undefined!");

  let fontLoader = tag('span', {
    textContent: "loading font",
    id: ""
  })
}

export default MgjGraphicEditor