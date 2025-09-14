import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Quote {
  text: string;
  author: string;
  category: string;
}

@Component({
  selector: 'app-quote-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quote-container">
      <div class="quote-card" [class.fade-in]="fadeIn">
        <div class="quote-icon">❝</div>
        <blockquote class="quote-text">
          {{ currentQuote.text }}
        </blockquote>
        <div class="quote-author">
          <span class="author-name">— {{ currentQuote.author }}</span>
          <span class="quote-category">{{ currentQuote.category }}</span>
        </div>
      </div>
      
      <div class="quote-controls">
        <button class="control-btn" (click)="previousQuote()" title="Previous Quote">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <div class="quote-indicators">
          <div 
            *ngFor="let quote of quotes; let i = index" 
            class="indicator"
            [class.active]="i === currentIndex"
            (click)="goToQuote(i)">
          </div>
        </div>
        
        <button class="control-btn" (click)="nextQuote()" title="Next Quote">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>
      
      <div class="action-buttons">
        <button class="action-btn primary" (click)="shareQuote()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
          </svg>
          Share Quote
        </button>
        
        <button class="action-btn secondary" (click)="toggleAutoRotation()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
          </svg>
          {{ autoRotation ? 'Pause' : 'Auto' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .quote-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .quote-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 24px;
      padding: 3rem;
      max-width: 600px;
      width: 100%;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      text-align: center;
      position: relative;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      transform: translateY(20px);
    }

    .quote-card.fade-in {
      opacity: 1;
      transform: translateY(0);
    }

    .quote-icon {
      font-size: 4rem;
      color: #7c3aed;
      margin-bottom: 1rem;
      font-family: Georgia, serif;
    }

    .quote-text {
      font-size: 1.5rem;
      line-height: 1.6;
      color: #1f2937;
      margin: 0 0 2rem 0;
      font-family: Georgia, 'Times New Roman', serif;
      font-style: italic;
      font-weight: 400;
    }

    .quote-author {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .author-name {
      font-size: 1.1rem;
      font-weight: 600;
      color: #374151;
    }

    .quote-category {
      font-size: 0.9rem;
      color: #7c3aed;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .quote-controls {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .control-btn {
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #7c3aed;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .control-btn:hover {
      background: white;
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    .quote-indicators {
      display: flex;
      gap: 0.5rem;
    }

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .indicator.active {
      background: white;
      transform: scale(1.2);
    }

    .indicator:hover {
      background: rgba(255, 255, 255, 0.8);
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }

    .action-btn.primary {
      background: #7c3aed;
      color: white;
    }

    .action-btn.primary:hover {
      background: #6d28d9;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
    }

    .action-btn.secondary {
      background: rgba(255, 255, 255, 0.9);
      color: #7c3aed;
    }

    .action-btn.secondary:hover {
      background: white;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      .quote-container {
        padding: 1rem;
      }

      .quote-card {
        padding: 2rem;
      }

      .quote-text {
        font-size: 1.25rem;
      }

      .quote-icon {
        font-size: 3rem;
      }

      .action-buttons {
        flex-direction: column;
        width: 100%;
        max-width: 300px;
      }

      .action-btn {
        justify-content: center;
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .quote-card {
        padding: 1.5rem;
      }

      .quote-text {
        font-size: 1.1rem;
      }

      .control-btn {
        width: 40px;
        height: 40px;
      }
    }
  `]
})
export class QuoteDisplayComponent implements OnInit, OnDestroy {
  quotes: Quote[] = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Inspiration"
    },
    {
      text: "Life is what happens to you while you're busy making other plans.",
      author: "John Lennon",
      category: "Life"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "Dreams"
    },
    {
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle",
      category: "Hope"
    },
    {
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
      category: "Resilience"
    },
    {
      text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
      author: "Martin Luther King Jr.",
      category: "Friendship"
    }
  ];

  currentIndex = 0;
  currentQuote = this.quotes[0];
  fadeIn = false;
  autoRotation = true;
  private intervalId?: number;

  ngOnInit() {
    setTimeout(() => {
      this.fadeIn = true;
    }, 100);
    
    if (this.autoRotation) {
      this.startAutoRotation();
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextQuote() {
    this.fadeIn = false;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.quotes.length;
      this.currentQuote = this.quotes[this.currentIndex];
      this.fadeIn = true;
    }, 250);
  }

  previousQuote() {
    this.fadeIn = false;
    setTimeout(() => {
      this.currentIndex = this.currentIndex === 0 ? this.quotes.length - 1 : this.currentIndex - 1;
      this.currentQuote = this.quotes[this.currentIndex];
      this.fadeIn = true;
    }, 250);
  }

  goToQuote(index: number) {
    if (index !== this.currentIndex) {
      this.fadeIn = false;
      setTimeout(() => {
        this.currentIndex = index;
        this.currentQuote = this.quotes[index];
        this.fadeIn = true;
      }, 250);
    }
  }

  shareQuote() {
    const text = `"${this.currentQuote.text}" — ${this.currentQuote.author}`;
    if (navigator.share) {
      navigator.share({
        title: 'Beautiful Quote',
        text: text
      });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('Quote copied to clipboard!');
      });
    }
  }

  toggleAutoRotation() {
    this.autoRotation = !this.autoRotation;
    if (this.autoRotation) {
      this.startAutoRotation();
    } else {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  }

  private startAutoRotation() {
    this.intervalId = window.setInterval(() => {
      this.nextQuote();
    }, 5000);
  }
}