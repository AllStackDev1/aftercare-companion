import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Thermometer, 
  Heart, 
  AlertTriangle, 
  Activity, 
  Droplets,
  Zap,
  Clock,
  Plus,
  Calendar
} from 'lucide-react';

export interface SymptomEntry {
  id: string;
  date: Date;
  symptoms: string[];
  severity: number;
  notes: string;
  needsAttention: boolean;
}

interface SymptomTrackerProps {
  onSymptomLog?: (entry: Omit<SymptomEntry, 'id'>) => void;
  entries?: SymptomEntry[];
}

const warningSymptoms = [
  { id: 'fever', label: 'Fever over 101°F', icon: Thermometer, type: 'warning' },
  { id: 'heavy-bleeding', label: 'Heavy bleeding', icon: Droplets, type: 'warning' },
  { id: 'severe-pain', label: 'Severe pain', icon: Zap, type: 'warning' },
  { id: 'infection-signs', label: 'Signs of infection', icon: AlertTriangle, type: 'warning' },
  { id: 'breathing-issues', label: 'Breathing difficulty', icon: Activity, type: 'warning' },
  { id: 'leg-swelling', label: 'Leg swelling/pain', icon: Heart, type: 'warning' }
];

const normalSymptoms = [
  { id: 'mild-pain', label: 'Mild incision pain', icon: Activity, type: 'normal' },
  { id: 'fatigue', label: 'Fatigue', icon: Clock, type: 'normal' },
  { id: 'bloating', label: 'Bloating', icon: Activity, type: 'normal' },
  { id: 'light-bleeding', label: 'Light spotting', icon: Droplets, type: 'normal' }
];

export const SymptomTracker = ({ onSymptomLog, entries = [] }: SymptomTrackerProps) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState(1);
  const [notes, setNotes] = useState('');

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const hasWarningSymptoms = selectedSymptoms.some(id => 
    warningSymptoms.some(symptom => symptom.id === id)
  );

  const handleSubmit = () => {
    if (selectedSymptoms.length === 0) return;

    const entry: Omit<SymptomEntry, 'id'> = {
      date: new Date(),
      symptoms: selectedSymptoms,
      severity,
      notes,
      needsAttention: hasWarningSymptoms || severity >= 7
    };

    onSymptomLog?.(entry);
    
    // Reset form
    setSelectedSymptoms([]);
    setSeverity(1);
    setNotes('');
  };

  const getSymptomInfo = (symptomId: string) => {
    return [...warningSymptoms, ...normalSymptoms].find(s => s.id === symptomId);
  };

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {hasWarningSymptoms && (
        <Alert className="border-warning bg-warning/10">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-warning-foreground">
            You've selected warning symptoms. Consider contacting your healthcare provider immediately if symptoms are severe.
          </AlertDescription>
        </Alert>
      )}

      {/* Symptom Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Log Today's Symptoms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Warning Symptoms */}
          <div>
            <Label className="text-base font-semibold text-warning">
              Warning Signs (Contact Doctor)
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {warningSymptoms.map((symptom) => {
                const Icon = symptom.icon;
                const isSelected = selectedSymptoms.includes(symptom.id);
                return (
                  <Button
                    key={symptom.id}
                    variant={isSelected ? "destructive" : "outline"}
                    className="h-auto p-3 justify-start"
                    onClick={() => toggleSymptom(symptom.id)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="text-sm">{symptom.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Normal Recovery Symptoms */}
          <div>
            <Label className="text-base font-semibold">
              Normal Recovery Symptoms
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {normalSymptoms.map((symptom) => {
                const Icon = symptom.icon;
                const isSelected = selectedSymptoms.includes(symptom.id);
                return (
                  <Button
                    key={symptom.id}
                    variant={isSelected ? "default" : "outline"}
                    className="h-auto p-3 justify-start"
                    onClick={() => toggleSymptom(symptom.id)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="text-sm">{symptom.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Severity Scale */}
          {selectedSymptoms.length > 0 && (
            <div>
              <Label className="text-base font-semibold">
                Overall Severity (1-10)
              </Label>
              <div className="flex gap-2 mt-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                  <Button
                    key={level}
                    variant={severity === level ? "default" : "outline"}
                    size="sm"
                    className="w-10 h-10"
                    onClick={() => setSeverity(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {selectedSymptoms.length > 0 && (
            <div>
              <Label htmlFor="symptom-notes" className="text-base font-semibold">
                Additional Notes
              </Label>
              <Textarea
                id="symptom-notes"
                placeholder="Describe your symptoms in more detail..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2"
              />
            </div>
          )}

          {/* Submit Button */}
          {selectedSymptoms.length > 0 && (
            <Button 
              onClick={handleSubmit}
              className="w-full"
              size="lg"
            >
              Log Symptoms
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Recent Entries */}
      {entries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-sm text-muted-foreground">
                      {entry.date.toLocaleDateString()} at {entry.date.toLocaleTimeString()}
                    </div>
                    {entry.needsAttention && (
                      <Badge variant="destructive" className="text-xs">
                        Needs Attention
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {entry.symptoms.map((symptomId) => {
                      const symptomInfo = getSymptomInfo(symptomId);
                      return (
                        <Badge 
                          key={symptomId}
                          variant={symptomInfo?.type === 'warning' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {symptomInfo?.label}
                        </Badge>
                      );
                    })}
                  </div>
                  <div className="text-sm">
                    Severity: <span className="font-semibold">{entry.severity}/10</span>
                  </div>
                  {entry.notes && (
                    <div className="text-sm text-muted-foreground mt-2">
                      {entry.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};