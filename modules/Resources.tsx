import React from 'react';
import { Card, Button, Input } from '../components/ui/Primitives';
import { Folder, FileText, Download, Search, FileCode, FileSpreadsheet, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';

const getIcon = (type: string) => {
  switch (type) {
    case 'PDF': return <FileText className="w-5 h-5 text-red-500" />;
    case 'CODE': return <FileCode className="w-5 h-5 text-yellow-500" />;
    case 'SHEET': return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
    default: return <FileText className="w-5 h-5 text-blue-500" />;
  }
};

export default function Resources() {
  const { resourceList } = useStore();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Resource Vault</h1>
          <p className="text-sm text-muted-foreground mt-1">Access course materials, notes, and assignments.</p>
        </div>
        <div className="relative w-full md:w-64">
           <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
           <Input placeholder="Search files..." className="pl-9 bg-background" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Folders Sidebar */}
        <div className="lg:col-span-1 space-y-4">
           <Card className="p-4 bg-secondary/20 border-border/50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Subjects</h3>
              <div className="space-y-1">
                 {['CS201 - Data Structures', 'EC204 - Digital Logic', 'MA102 - Calculus', 'HS301 - Economics'].map(sub => (
                   <button key={sub} className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-foreground/80 rounded-md hover:bg-secondary/60 hover:text-primary transition-colors text-left group">
                      <Folder className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      {sub}
                   </button>
                 ))}
              </div>
           </Card>
           
           <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <h4 className="font-semibold text-sm text-foreground mb-1">Upload Contribution</h4>
              <p className="text-xs text-muted-foreground mb-3">Earn credits by sharing high-quality notes.</p>
              <Button size="sm" className="w-full">Upload File</Button>
           </Card>
        </div>

        {/* Files Grid */}
        <div className="lg:col-span-3">
          <Card className="overflow-hidden border-border/60">
             <div className="overflow-x-auto">
               <table className="w-full text-sm">
                 <thead className="bg-muted/30 border-b border-border/60">
                   <tr>
                     <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">File Name</th>
                     <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">Subject</th>
                     <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">Size</th>
                     <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">Uploaded</th>
                     <th className="px-6 py-3 text-right font-medium text-muted-foreground text-xs uppercase tracking-wider">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border/40">
                   {resourceList.map((file) => (
                     <tr key={file.id} className="group hover:bg-secondary/30 transition-colors">
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                           <div className="p-2 bg-secondary/50 rounded-md border border-border/40 group-hover:border-border transition-colors">
                             {getIcon(file.type)}
                           </div>
                           <div>
                             <p className="font-medium text-foreground">{file.name}</p>
                             <p className="text-[10px] text-muted-foreground">{file.downloads} downloads</p>
                           </div>
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-foreground">
                           {file.subject}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-muted-foreground text-xs font-mono">{file.size}</td>
                       <td className="px-6 py-4 text-muted-foreground text-xs">{file.date}</td>
                       <td className="px-6 py-4 text-right">
                         <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                           <Download className="w-4 h-4" />
                         </Button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}