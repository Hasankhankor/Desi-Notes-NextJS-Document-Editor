"use client";

import { useEffect, useRef, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [content, setContent] = useState<string>(
    "<p>Your modern document editor with a South Asian touch. Start writing</p>"
  );
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && editorRef.current) {
      const $ = (window as any).$;
      $(editorRef.current).summernote({
        placeholder: content,
        tabsize: 2,
        height: 500,
        toolbar: [
          ["insert", ["picture", "link", "video", "table", "hr"]],
          ["fontstyle", ["fontname", "fontsize", "fontsizeunit"]],
          [
            "font",
            [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "superscript",
              "subscript",
              "clear",
            ],
          ],
          ["history", ["undo", "redo"]],
          ["color", ["forecolor", "backcolor"]],
          ["para", ["ol", "ul", "paragraph", "height"]],
          ["misc", ["fullscreen", "codeview", "help"]],
          [
            "style",
            [
              "style",
              "p",
              "blockquote",
              "pre",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
            ],
          ],
        ],
        codeviewFilter: false,
        codeviewIframeFilter: true,
        callbacks: {
          onChange: (contents: string) => {
            console.log(contents);
            setContent(contents);
          },
        },
      });
    }

    return () => {
      if (editorRef.current) {
        const $ = (window as any).$;
        $(editorRef.current).summernote("destroy");
      }
    };
  }, []);

  const handleDownloadPDF = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // Improves PDF quality
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("document.pdf");
    }
  };

  return (
    <section className="custom-section">
      <DarkModeToggle />
      <div className="custom-grid">
        <div className="custom-editor">
          <h1 className="custom-title">Desi Notes</h1>
          <div ref={editorRef} id="summernote"></div>
        </div>
        <div className="custom-preview">
          <h1 className="custom-title">Content Preview</h1>
          <div
            ref={previewRef}
            className="custom-prose"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <button
            className="download-btn"
            onClick={handleDownloadPDF}
            style={{ marginTop: "20px" }}
          >
            Download as PDF
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
