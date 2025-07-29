import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  StickyNote,
  Calendar,
  Heart,
  TrendingUp
} from 'lucide-react';
import { BrochureViewer } from './BrochureViewer';
import { BrochureDashboard } from './BrochureDashboard';
import { SymptomTracker, SymptomEntry } from './SymptomTracker';
import { NotesSection, Note } from './NotesSection';
import { BrochureData, getBrochureById } from '@/data/brochureData';

export const Dashboard = () => {
  const [selectedBrochure, setSelectedBrochure] = useState<BrochureData | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCheckedItems = localStorage.getItem('checkedItems');
    const savedSymptoms = localStorage.getItem('symptoms');
    const savedNotes = localStorage.getItem('notes');

    if (savedCheckedItems) {
      setCheckedItems(new Set(JSON.parse(savedCheckedItems)));
    }
    if (savedSymptoms) {
      setSymptoms(JSON.parse(savedSymptoms).map((s: any) => ({
        ...s,
        date: new Date(s.date)
      })));
    }
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes).map((n: any) => ({
        ...n,
        createdAt: new Date(n.createdAt),
        updatedAt: new Date(n.updatedAt)
      })));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify([...checkedItems]));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem('symptoms', JSON.stringify(symptoms));
  }, [symptoms]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleItemCheck = (sectionId: string, itemId: string, checked: boolean) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(itemId);
      } else {
        newSet.delete(itemId);
      }
      return newSet;
    });
  };

  const handleSymptomLog = (entry: Omit<SymptomEntry, 'id'>) => {
    const newEntry: SymptomEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setSymptoms(prev => [newEntry, ...prev]);
  };

  const handleNoteAdd = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const handleNoteUpdate = (id: string, updatedNote: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, ...updatedNote } : note
    ));
  };

  const handleNoteDelete = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const handleSelectBrochure = (brochure: BrochureData) => {
    setSelectedBrochure(brochure);
  };

  const handleBackToDashboard = () => {
    setSelectedBrochure(null);
  };

  // Calculate progress statistics
  const totalCheckableItems = selectedBrochure?.sections.reduce(
    (total, section) => total + section.items.filter(item => item.checkable).length,
    0
  ) || 0;
  const completedItems = checkedItems.size;
  const progressPercentage = totalCheckableItems > 0 ? (completedItems / totalCheckableItems) * 100 : 0;

  const recentWarningSymptoms = symptoms.filter(s => s.needsAttention).slice(0, 3);
  const todaySymptoms = symptoms.filter(s => 
    new Date(s.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      {!selectedBrochure ? (
        <BrochureDashboard onSelectBrochure={handleSelectBrochure} />
      ) : (
        <>
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-primary">Medical Care Companion</h1>
            <p className="text-muted-foreground">
              Track your recovery progress and stay informed about your healing journey
            </p>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Recovery Progress</p>
                    <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <Progress value={progressPercentage} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                    <p className="text-2xl font-bold">{completedItems}/{totalCheckableItems}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Today's Symptoms</p>
                    <p className="text-2xl font-bold">{todaySymptoms.length}</p>
                  </div>
                  <Activity className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">My Notes</p>
                    <p className="text-2xl font-bold">{notes.length}</p>
                  </div>
                  <StickyNote className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Warning Alerts */}
          {recentWarningSymptoms.length > 0 && (
            <Card className="border-warning bg-warning/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="w-5 h-5" />
                  Recent Warning Symptoms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentWarningSymptoms.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-2 bg-warning/10 rounded">
                      <span className="text-sm">{entry.date.toLocaleDateString()}</span>
                      <Badge variant="destructive">Severity: {entry.severity}/10</Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-3" size="sm">
                  Contact Healthcare Provider
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Main Content Tabs */}
          <Tabs defaultValue="guide" className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto">
              <TabsTrigger value="guide" className="flex items-center gap-2 p-3">
                <Heart className="w-4 h-4" />
                Care Guide
              </TabsTrigger>
              <TabsTrigger value="symptoms" className="flex items-center gap-2 p-3">
                <Activity className="w-4 h-4" />
                Symptom Tracker
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2 p-3">
                <StickyNote className="w-4 h-4" />
                My Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guide" className="space-y-6">
              <BrochureViewer 
                brochure={selectedBrochure}
                onItemCheck={handleItemCheck}
                checkedItems={checkedItems}
                onBack={handleBackToDashboard}
              />
            </TabsContent>

            <TabsContent value="symptoms" className="space-y-6">
              <SymptomTracker 
                onSymptomLog={handleSymptomLog}
                entries={symptoms}
              />
            </TabsContent>

            <TabsContent value="notes" className="space-y-6">
              <NotesSection 
                onNoteAdd={handleNoteAdd}
                onNoteUpdate={handleNoteUpdate}
                onNoteDelete={handleNoteDelete}
                notes={notes}
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};