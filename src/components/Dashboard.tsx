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
import { trackersService } from '@/services/trackersService';
import { NotesSection, Note } from './NotesSection';
import { notesService } from '@/services/notesService';
import { BrochureData, getBrochureById } from '@/data/brochureData';

export const Dashboard = () => {
  const [selectedBrochure, setSelectedBrochure] = useState<BrochureData | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);
  const [symptomsLoading, setSymptomsLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);

  // Load notes from backend on mount
  useEffect(() => {
    setNotesLoading(true);
    notesService.getNotes()
      .then(fetchedNotes => {
        setNotes(
          fetchedNotes.map(n => ({
            ...n,
            createdAt: new Date(n.createdAt),
            updatedAt: new Date(n.updatedAt),
          }))
        );
      })
      .catch(() => setNotes([]))
      .finally(() => setNotesLoading(false));
  }, []);

  // Load symptoms from backend on mount
  useEffect(() => {
    setSymptomsLoading(true);
    trackersService.getTrackers()
      .then(fetchedTrackers => {
        setSymptoms(
          fetchedTrackers.map(t => ({
            ...t.data,
            id: t.id,
            date: new Date(t.data.date),
          }))
        );
      })
      .catch(() => setSymptoms([]))
      .finally(() => setSymptomsLoading(false));
  }, []);

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

  const handleSymptomLog = async (entry: Omit<SymptomEntry, 'id'>) => {
    try {
      const tracker = await trackersService.addTracker(entry);
      setSymptoms(prev => [
        {
          ...tracker.data,
          id: tracker.id,
          date: new Date(tracker.data.date),
        },
        ...prev,
      ]);
    } catch (e) {
      // handle error
    }
  };

  const handleNoteAdd = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    try {
      const newNote = await notesService.addNote(note);
      setNotes(prev => [
        {
          ...newNote,
          createdAt: new Date(newNote.createdAt),
          updatedAt: new Date(newNote.updatedAt),
        },
        ...prev,
      ]);
    } catch (e) {
      // handle error (e.g., show toast)
    }
  };

  const handleNoteUpdate = async (id: string, updatedNote: Partial<Note>) => {
    try {
      const updated = await notesService.updateNote(id, updatedNote);
      setNotes(prev =>
        prev.map(note =>
          note.id === id
            ? {
                ...note,
                ...updated,
                createdAt: new Date(updated.createdAt),
                updatedAt: new Date(updated.updatedAt),
              }
            : note
        )
      );
    } catch (e) {
      // handle error
    }
  };

  const handleNoteDelete = async (id: string) => {
    try {
      await notesService.deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (e) {
      // handle error
    }
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
