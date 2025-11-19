import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/star-rating';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: string;
  text: string;
  category: string;
}

const RatingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ratingType = searchParams.get('type') || 'dosen';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions: Question[] = [
    // Category 1
    { id: 'q1', text: 'Kemampuan menyampaikan materi', category: 'Teaching' },
    { id: 'q2', text: 'Kesiapan dalam mengajar', category: 'Teaching' },
    { id: 'q3', text: 'Penggunaan media pembelajaran', category: 'Teaching' },
    { id: 'q4', text: 'Kemampuan menjelaskan konsep', category: 'Teaching' },
    // Category 2
    { id: 'q5', text: 'Ketepatan waktu', category: 'Discipline' },
    { id: 'q6', text: 'Responsif terhadap pertanyaan', category: 'Discipline' },
    { id: 'q7', text: 'Ketersediaan konsultasi', category: 'Discipline' },
    { id: 'q8', text: 'Pemberian feedback', category: 'Discipline' },
    // Category 3
    { id: 'q9', text: 'Sikap dan perilaku', category: 'Attitude' },
    { id: 'q10', text: 'Motivasi kepada mahasiswa', category: 'Attitude' },
  ];

  const steps = ['Teaching', 'Discipline', 'Attitude', 'Review'];
  const questionsPerStep = Math.ceil(questions.length / 3);

  const getCurrentQuestions = () => {
    if (currentStep === 3) return [];
    const start = currentStep * questionsPerStep;
    const end = start + questionsPerStep;
    return questions.slice(start, end);
  };

  const handleRatingChange = (questionId: string, value: number) => {
    setRatings((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    const currentQuestions = getCurrentQuestions();
    const allAnswered = currentQuestions.every((q) => ratings[q.id]);

    if (!allAnswered && currentStep < 3) {
      toast.error('Mohon jawab semua pertanyaan!');
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!comment.trim()) {
      toast.error('Mohon berikan komentar!');
      return;
    }

    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        toast.success('Rating berhasil dikirim!');
        navigate('/dashboard');
      }, 2000);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-center"
        >
          <CheckCircle2 className="w-24 h-24 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-2">Terima Kasih!</h2>
          <p className="text-muted-foreground">Rating Anda telah berhasil dikirim</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 text-center"
              >
                <div
                  className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center font-bold ${
                    index <= currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
                <p
                  className={`text-sm ${
                    index <= currentStep ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="bg-primary h-2 rounded-full"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep < 3 ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-xl p-8 shadow-soft border border-border"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {steps[currentStep]} Evaluation
              </h2>
              <div className="space-y-6">
                {getCurrentQuestions().map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-muted/30 rounded-lg"
                  >
                    <p className="text-foreground mb-3 font-medium">{question.text}</p>
                    <StarRating
                      value={ratings[question.id] || 0}
                      onChange={(value) => handleRatingChange(question.id, value)}
                      size="lg"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="review"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-xl p-8 shadow-soft border border-border"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Review & Comment</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {steps.slice(0, 3).map((step, index) => {
                    const stepQuestions = questions.slice(
                      index * questionsPerStep,
                      (index + 1) * questionsPerStep
                    );
                    const avg =
                      stepQuestions.reduce((sum, q) => sum + (ratings[q.id] || 0), 0) /
                      stepQuestions.length;
                    return (
                      <div key={step} className="p-4 bg-muted/30 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground mb-2">{step}</p>
                        <p className="text-3xl font-bold text-primary">{avg.toFixed(1)}</p>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <label className="text-foreground font-medium mb-2 block">
                    Komentar Tambahan
                  </label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Berikan feedback atau saran..."
                    rows={6}
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          {currentStep < 3 ? (
            <Button onClick={handleNext} className="gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-2">
              Submit Rating
              <CheckCircle2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
