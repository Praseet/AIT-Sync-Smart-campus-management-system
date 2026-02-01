import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Badge } from '../components/ui/Primitives';
import { useStore } from '../store/useStore';
import { User, Mail, Phone, MapPin, Shield, GraduationCap, Edit2, Save, UserCog } from 'lucide-react';
import { UserRole } from '../types';

export default function Profile() {
  const { currentUser, updateUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
      name: currentUser.name,
      email: 'aditya.verma@ait.edu.in', // Mock data not in store type yet
      phone: '+91 98765 43210',
      bio: 'Computer Science enthusiast. Love algorithms and coffee.'
  });

  // Role Switcher State
  const handleRoleSwitch = (role: UserRole) => {
      updateUser({ role });
  };

  const handleSave = () => {
      updateUser({ name: formData.name });
      setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2 border-b border-border/40">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">My Profile</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your personal information and account settings.</p>
            </div>
            <div className="flex gap-2">
                 {isEditing ? (
                     <Button onClick={handleSave} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"><Save className="w-4 h-4" /> Save Changes</Button>
                 ) : (
                     <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2"><Edit2 className="w-4 h-4" /> Edit Profile</Button>
                 )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Avatar & Role */}
            <Card className="p-6 flex flex-col items-center text-center space-y-4 h-fit">
                 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-violet-700 flex items-center justify-center text-3xl font-bold text-white shadow-lg ring-4 ring-background">
                     {currentUser.name.charAt(0)}
                 </div>
                 <div>
                     <h2 className="text-xl font-bold">{currentUser.name}</h2>
                     <p className="text-sm text-muted-foreground">ID: {currentUser.id.toUpperCase()}</p>
                 </div>
                 <Badge className="px-3 py-1 bg-secondary text-foreground border-border">{currentUser.role}</Badge>
                 
                 <div className="w-full pt-4 border-t border-border mt-4">
                     <div className="grid grid-cols-2 gap-4 text-center">
                         <div>
                             <p className="text-2xl font-bold text-primary">{currentUser.cgpa}</p>
                             <p className="text-xs uppercase font-bold text-muted-foreground">CGPA</p>
                         </div>
                         <div>
                             <p className="text-2xl font-bold text-primary">{currentUser.attendance}%</p>
                             <p className="text-xs uppercase font-bold text-muted-foreground">Attendance</p>
                         </div>
                     </div>
                 </div>
            </Card>

            {/* Right Column: Details */}
            <div className="md:col-span-2 space-y-6">
                <Card className="p-6 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                        <User className="w-4 h-4" /> Personal Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-medium">Full Name</label>
                            <Input 
                                disabled={!isEditing} 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium">Email</label>
                            <Input 
                                disabled={!isEditing} 
                                value={formData.email} 
                                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium">Phone</label>
                            <Input 
                                disabled={!isEditing} 
                                value={formData.phone} 
                                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium">Location</label>
                            <Input 
                                disabled={true} 
                                value={currentUser.is_local_resident ? 'Local Resident' : 'Outstation'} 
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                             <label className="text-xs font-medium">Bio</label>
                             <textarea 
                                disabled={!isEditing}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                rows={3}
                                value={formData.bio}
                                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                             />
                        </div>
                    </div>
                </Card>

                {/* Admin Area: Role Switcher */}
                <Card className="p-6 border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-amber-600 dark:text-amber-500 flex items-center gap-2 mb-4">
                        <Shield className="w-4 h-4" /> System Role (Demo)
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">
                        Switch roles to preview the interface as different user types. 
                        <span className="italic block mt-1">(Note: This is for demonstration purposes. In production, this would be handled by RBAC).</span>
                    </p>
                    <div className="flex gap-2">
                        {(['STUDENT', 'FACULTY', 'ADMIN', 'ALUMNI'] as UserRole[]).map((r) => (
                            <button
                                key={r}
                                onClick={() => handleRoleSwitch(r)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${currentUser.role === r ? 'bg-foreground text-background border-foreground' : 'bg-background text-muted-foreground border-border hover:border-foreground'}`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    </div>
  );
}