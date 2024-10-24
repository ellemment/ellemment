import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { FileText, Cog, FileOutput, GalleryVerticalEnd } from 'lucide-react';
import React from 'react';

import { ApiStatusAlert } from '#app/components/engine/api-status';
import { InputSection } from '#app/components/engine/input';
import { OutputSection } from '#app/components/engine/output';
import { ProcessorSection } from '#app/components/engine/processor';
import { ProgressStepper } from '#app/components/engine/progress';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '#app/components/ui/sidebar';
import { type LoaderData } from '#app/utils/beta/types';
import { useFileProcessing } from '#app/utils/beta/use-file-processing';

export const loader: LoaderFunction = async () => {
  return json({ apiAccessible: true });
};

export default function AppIndex() {
  const { apiAccessible } = useLoaderData<LoaderData>();
  const {
    currentStep,
    setCurrentStep,
    summary,
    file,
    isProcessing,
    logs,
    outputData,
    handleFileChange: originalHandleFileChange,
    handleProcess,
  } = useFileProcessing();

  // Wrap the original handleFileChange to include auto-navigation
  const handleFileChange = (file: File | null) => {
    originalHandleFileChange(file);
    
    // If a file was selected, automatically move to the processor section
    if (file) {
      setCurrentStep(2);
    }
  };

  // Helper function to get button state
  const getButtonState = (step: number) => ({
    isActive: currentStep === step,
    tooltip: `Step ${step}`,
  });

  return (
    <SidebarProvider className="mb-20">
      <Sidebar variant="floating" className="sticky top-0">
        <SidebarHeader className="min-h-96">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Engine Beta</span>
                    <span className="">v1.0</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem className='gap-2'>
              <SidebarMenuButton
                onClick={() => setCurrentStep(1)}
                {...getButtonState(1)}
              >
                <FileText className="mr-2" />
                Input
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setCurrentStep(2)}
                {...getButtonState(2)}
              >
                <Cog className="mr-2" />
                Processor
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setCurrentStep(3)}
                {...getButtonState(3)}
              >
                <FileOutput className="mr-2" />
                Output
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </Sidebar>

      <SidebarInset>
        <div className="flex-1 space-y-4 p-2">
          {currentStep === 1 && (
            <div className="rounded-lg border bg-card">
              <InputSection onFileChange={handleFileChange} />
            </div>
          )}

          {currentStep === 2 && (
            <div className="rounded-lg border bg-card">
              <ProcessorSection
                onProcess={handleProcess}
                isProcessing={isProcessing}
                logs={logs}
                file={file}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="rounded-lg border bg-card">
              <OutputSection summary={summary} outputData={outputData} />
            </div>
          )}

          {!apiAccessible && (
            <div className="mt-4">
              <ApiStatusAlert apiAccessible={apiAccessible} />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}