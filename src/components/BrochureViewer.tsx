import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, AlertCircle, CheckCircle, Info, Calendar, Activity, Clock, Pill, Shield, Utensils } from 'lucide-react';
import { myomectomyBrochure, BrochureSection, BrochureItem } from '@/data/brochureData';

const iconMap = {
  Calendar,
  Activity,
  Clock,
  AlertTriangle,
  Pill,
  AlertCircle,
  Shield,
  Utensils,
};

interface BrochureViewerProps {
  onItemCheck?: (sectionId: string, itemId: string, checked: boolean) => void;
  checkedItems?: Set<string>;
}

export const BrochureViewer = ({ onItemCheck, checkedItems = new Set() }: BrochureViewerProps) => {
  const [selectedSection, setSelectedSection] = useState<string>(myomectomyBrochure.sections[0].id);

  const getItemIcon = (item: BrochureItem) => {
    switch (item.type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'info':
        return <Info className="w-4 h-4 text-accent" />;
      default:
        return null;
    }
  };

  const getItemBadge = (item: BrochureItem) => {
    switch (item.type) {
      case 'warning':
        return <Badge variant="destructive" className="text-xs">Important</Badge>;
      case 'success':
        return <Badge className="text-xs bg-success text-success-foreground">Recommended</Badge>;
      case 'info':
        return <Badge variant="secondary" className="text-xs">Info</Badge>;
      default:
        return null;
    }
  };

  const currentSection = myomectomyBrochure.sections.find(s => s.id === selectedSection);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Section Navigation */}
      <div className="lg:w-1/3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recovery Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] lg:h-[600px]">
              <div className="space-y-2">
                {myomectomyBrochure.sections.map((section) => {
                  const Icon = iconMap[section.icon as keyof typeof iconMap];
                  return (
                    <Button
                      key={section.id}
                      variant={selectedSection === section.id ? "default" : "ghost"}
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => setSelectedSection(section.id)}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon className="w-4 h-4" />}
                        <span className="text-sm font-medium">{section.title}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Section Content */}
      <div className="lg:w-2/3">
        {currentSection && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                {currentSection.icon && iconMap[currentSection.icon as keyof typeof iconMap] && (
                  <div className="p-2 rounded-lg bg-primary/10">
                    {(() => {
                      const Icon = iconMap[currentSection.icon as keyof typeof iconMap];
                      return <Icon className="w-5 h-5 text-primary" />;
                    })()}
                  </div>
                )}
                <CardTitle className="text-xl">{currentSection.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] lg:h-[600px]">
                <div className="space-y-4">
                  {currentSection.items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg border ${
                        item.type === 'warning' 
                          ? 'border-warning/20 bg-warning/5' 
                          : item.type === 'success'
                          ? 'border-success/20 bg-success/5'
                          : 'border-border bg-card'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {item.checkable && (
                          <Checkbox
                            id={item.id}
                            checked={checkedItems.has(item.id)}
                            onCheckedChange={(checked) => 
                              onItemCheck?.(currentSection.id, item.id, checked as boolean)
                            }
                            className="mt-0.5"
                          />
                        )}
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              {getItemIcon(item)}
                              <p className="text-sm leading-relaxed">{item.text}</p>
                            </div>
                            {getItemBadge(item)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};