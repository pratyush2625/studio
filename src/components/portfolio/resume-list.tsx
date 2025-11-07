
'use client';

import { FileText, Trash2 } from "lucide-react";
import type { ResumeData } from "@/app/dashboard/portfolio/page";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface ResumeListProps {
  resumes: ResumeData[];
  onSelectResume: (resume: ResumeData) => void;
  onDeleteResume: (resumeId: string) => void;
}

export function ResumeList({ resumes, onSelectResume, onDeleteResume }: ResumeListProps) {
  return (
    <div className="space-y-4">
      {resumes.map((resume) => (
        <Card key={resume.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <button
              onClick={() => onSelectResume(resume)}
              className="flex items-center gap-3 text-left flex-1"
            >
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">{resume.resumeName}</p>
                <p className="text-sm text-muted-foreground">{resume.name}</p>
              </div>
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteResume(resume.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete Resume</span>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
