import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import styles from './pdfViewer.module.css';

interface PdfViewerProps {
  file: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  return (
    <div className={styles.pdfViewerContainer}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.11.338/build/pdf.worker.min.js`}>
          <Viewer
            fileUrl={file}
            plugins={[toolbarPluginInstance]}
            defaultScale={SpecialZoomLevel.PageFit}
            initialPage={1}
          />
          <Toolbar />
        </Worker>
    </div>
  );
};

export default PdfViewer;