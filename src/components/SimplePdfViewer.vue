<template>
  <div class="pdf-box">
    <div ref="container" class="pageContainer" >
      <div id="viewer" class="pdfViewer"></div>
    </div>
  </div>
</template>

<script>
import pdfjsLib from "pdfjs-dist/build/pdf";
import {PDFViewer} from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js";

export default {
  name: "SimplePdfViewer",

  props: {
    pdfUrl: {
      type: String,
      required: true
    }
  },

  mounted() {
    this.loadPdf();
  },

  methods: {
    async loadPdf() {
      let container = this.$refs.container;
      let pdfViewer = new PDFViewer({
        container: container
      });

      let loadingTask = pdfjsLib.getDocument(this.pdfUrl);
      let pdf = await loadingTask.promise;

      pdfViewer.setDocument(pdf);
    }
  },

  watch: {
    pdfUrl() {
      this.loadPdf()
    }
  }
}
</script>


<style>
.pdf-box {
  /*position: relative;*/
  overflow: auto;
}

.pageContainer {
  background: #efefef;
  margin: auto;
  width: 80%;
}

.pdf-box div.page {
  display: inline-block;
  box-shadow: 0 0 25px 1px rgba(0, 0, 0, .1);
  border: none;
  margin: 10px ;
  overflow: hidden;
}
</style>
