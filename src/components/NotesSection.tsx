import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  StickyNote, 
  Plus, 
  Calendar,
  Clock,
  Edit3,
  Trash2,
  Save,
  X
} from 'lucide-react';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: 'question' | 'observation' | 'medication' | 'appointment' | 'general';
  createdAt: Date;
  updatedAt: Date;
}

interface NotesSectionProps {
  onNoteAdd?: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onNoteUpdate?: (id: string, note: Partial<Note>) => void;
  onNoteDelete?: (id: string) => void;
  notes?: Note[];
}

const categoryOptions = [
  { value: 'question', label: 'Question for Doctor', color: 'bg-blue-100 text-blue-800' },
  { value: 'observation', label: 'Observation', color: 'bg-green-100 text-green-800' },
  { value: 'medication', label: 'Medication', color: 'bg-purple-100 text-purple-800' },
  { value: 'appointment', label: 'Appointment', color: 'bg-orange-100 text-orange-800' },
  { value: 'general', label: 'General', color: 'bg-gray-100 text-gray-800' }
];

export const NotesSection = ({ 
  onNoteAdd, 
  onNoteUpdate, 
  onNoteDelete, 
  notes = [] 
}: NotesSectionProps) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'general' as Note['category']
  });
  const [editNote, setEditNote] = useState({
    title: '',
    content: '',
    category: 'general' as Note['category']
  });

  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    onNoteAdd?.(newNote);
    setNewNote({ title: '', content: '', category: 'general' });
    setIsAddingNote(false);
  };

  const handleEditNote = (note: Note) => {
    setEditingNoteId(note.id);
    setEditNote({
      title: note.title,
      content: note.content,
      category: note.category
    });
  };

  const handleUpdateNote = () => {
    if (!editNote.title.trim() || !editNote.content.trim()) return;

    onNoteUpdate?.(editingNoteId!, {
      ...editNote,
      updatedAt: new Date()
    });
    setEditingNoteId(null);
    setEditNote({ title: '', content: '', category: 'general' });
  };

  const getCategoryInfo = (category: Note['category']) => {
    return categoryOptions.find(opt => opt.value === category);
  };

  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">My Recovery Notes</h2>
        </div>
        <Button
          onClick={() => setIsAddingNote(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Note
        </Button>
      </div>

      {/* Add New Note Form */}
      {isAddingNote && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="note-title">Title</Label>
              <Input
                id="note-title"
                placeholder="What's this note about?"
                value={newNote.title}
                onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="note-category">Category</Label>
              <select
                id="note-category"
                className="w-full mt-1 p-2 border border-input rounded-md bg-background"
                value={newNote.category}
                onChange={(e) => setNewNote(prev => ({ ...prev, category: e.target.value as Note['category'] }))}
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="note-content">Content</Label>
              <Textarea
                id="note-content"
                placeholder="Write your note here..."
                value={newNote.content}
                onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddNote} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Note
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNote({ title: '', content: '', category: 'general' });
                }}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {sortedNotes.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <StickyNote className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No notes yet. Start by adding your first note!
              </p>
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {sortedNotes.map((note) => (
                <Card key={note.id}>
                  <CardContent className="p-4">
                    {editingNoteId === note.id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <Input
                          value={editNote.title}
                          onChange={(e) => setEditNote(prev => ({ ...prev, title: e.target.value }))}
                          className="font-semibold"
                        />
                        
                        <select
                          className="w-full p-2 border border-input rounded-md bg-background"
                          value={editNote.category}
                          onChange={(e) => setEditNote(prev => ({ ...prev, category: e.target.value as Note['category'] }))}
                        >
                          {categoryOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                        <Textarea
                          value={editNote.content}
                          onChange={(e) => setEditNote(prev => ({ ...prev, content: e.target.value }))}
                          rows={4}
                        />

                        <div className="flex gap-2">
                          <Button onClick={handleUpdateNote} size="sm" className="flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            Save
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingNoteId(null)}
                            className="flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {note.createdAt.toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {note.updatedAt.toLocaleTimeString()}
                              </div>
                            </div>
                            <Badge className={getCategoryInfo(note.category)?.color}>
                              {getCategoryInfo(note.category)?.label}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditNote(note)}
                              className="flex items-center gap-1"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onNoteDelete?.(note.id)}
                              className="flex items-center gap-1 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="prose prose-sm max-w-none">
                          <p className="whitespace-pre-wrap text-sm leading-relaxed">
                            {note.content}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};