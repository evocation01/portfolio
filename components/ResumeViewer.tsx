"use client";

import { Button } from "./ui/button";
import { Download, Eye } from "lucide-react";

export function ResumeViewer() {
    const pdfUrl = "/assets/041225_CV.pdf";

    return (
        <div className="flex items-center gap-4">
            <Button
                onClick={() => window.open(pdfUrl, "_blank")}
            >
                <Eye className="mr-2 h-4 w-4" /> View in New Tab
            </Button>
            <Button variant="outline" asChild>
                <a href={pdfUrl} download="Hakan_Ispir_CV.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                </a>
            </Button>
        </div>
    );
}