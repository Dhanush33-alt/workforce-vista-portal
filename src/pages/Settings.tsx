
import { Layout } from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings as SettingsIcon, Bell, Shield, Database, Users } from "lucide-react"

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">System Settings</h2>
          <p className="text-slate-600">Configure your Employee Management System preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* General Settings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic system configuration and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="TechCorp Solutions" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@techcorp.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company-address">Company Address</Label>
                <Input id="company-address" defaultValue="123 Business St, Tech City, TC 12345" />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">System Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-backup">Automatic Backups</Label>
                      <p className="text-sm text-slate-600">Daily automatic data backups</p>
                    </div>
                    <Switch id="auto-backup" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-slate-600">Send system notifications via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="audit-logging">Audit Logging</Label>
                      <p className="text-sm text-slate-600">Track all system activities</p>
                    </div>
                    <Switch id="audit-logging" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                System Information
              </CardTitle>
              <CardDescription>Current system status and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Version:</span>
                  <Badge variant="outline">v2.1.0</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Database:</span>
                  <Badge className="bg-green-500">Connected</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Last Backup:</span>
                  <span className="text-sm font-medium">2 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Storage Used:</span>
                  <span className="text-sm font-medium">2.3 GB</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Export Employee Data
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Generate System Report
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Clear Cache
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
            <CardDescription>Configure security and access control settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Access Control</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-slate-600">Require 2FA for admin access</p>
                    </div>
                    <Switch id="two-factor" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="session-timeout">Auto Session Timeout</Label>
                      <p className="text-sm text-slate-600">Automatically log out inactive users</p>
                    </div>
                    <Switch id="session-timeout" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-duration">Session Duration (minutes)</Label>
                    <Input id="session-duration" type="number" defaultValue="30" className="w-24" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Data Protection</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-encryption">Data Encryption</Label>
                      <p className="text-sm text-slate-600">Encrypt sensitive employee data</p>
                    </div>
                    <Switch id="data-encryption" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="gdpr-compliance">GDPR Compliance</Label>
                      <p className="text-sm text-slate-600">Enable GDPR compliance features</p>
                    </div>
                    <Switch id="gdpr-compliance" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retention-period">Data Retention (days)</Label>
                    <Input id="retention-period" type="number" defaultValue="2555" className="w-24" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure system notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">System Alerts</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-employee">New Employee Added</Label>
                      <p className="text-sm text-slate-600">Notify when new employees are added</p>
                    </div>
                    <Switch id="new-employee" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="training-complete">Training Completed</Label>
                      <p className="text-sm text-slate-600">Notify when training is completed</p>
                    </div>
                    <Switch id="training-complete" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="system-maintenance">System Maintenance</Label>
                      <p className="text-sm text-slate-600">Notify about scheduled maintenance</p>
                    </div>
                    <Switch id="system-maintenance" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Performance Alerts</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="low-performance">Low Performance Alert</Label>
                      <p className="text-sm text-slate-600">Alert for below-average performance</p>
                    </div>
                    <Switch id="low-performance" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="training-overdue">Training Overdue</Label>
                      <p className="text-sm text-slate-600">Alert for overdue training</p>
                    </div>
                    <Switch id="training-overdue" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="review-reminder">Review Reminders</Label>
                      <p className="text-sm text-slate-600">Remind about pending reviews</p>
                    </div>
                    <Switch id="review-reminder" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
