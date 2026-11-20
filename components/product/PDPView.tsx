'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ShoppingCart, Heart, MessageSquare, CheckCircle2 } from 'lucide-react';
import type { ThemeConfig, ProductDetail } from '@/lib/api/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/currency';
import { submitProductReview } from '@/lib/api/products';

interface Props {
  theme: ThemeConfig;
  product: ProductDetail | null;
}

export default function PDPView({ theme, product }: Props) {
  const { add } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);

  // Review submission state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="sf-container py-24 text-center">
        <p style={{ color: 'var(--sf-text-muted)' }}>Product not found.</p>
      </div>
    );
  }

  const currency = theme.currency || 'USD';
  const wishlisted = isWishlisted(product.id);

  // Reviews flow privilege check: both store theme and product must have reviewsEnabled !== false
  const isReviewsEnabled = theme.reviewsEnabled !== false && product.reviewsEnabled !== false;
  const approvedReviews = (product.reviews || []).filter((r) => r.status === 'APPROVED');
  const totalReviews = approvedReviews.length;
  const averageRating =
    totalReviews > 0
      ? (approvedReviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
      : '5.0';

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      setSubmitError('Name and review details are required');
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitProductReview(product.id, {
        userName: formName.trim(),
        userEmail: formEmail.trim() || undefined,
        rating: formRating,
        title: formTitle.trim() || undefined,
        comment: formComment.trim(),
      });
      setSubmitSuccess(true);
      setShowReviewForm(false);
      setFormName('');
      setFormEmail('');
      setFormTitle('');
      setFormComment('');
      setFormRating(5);
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sf-container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div
            className="relative aspect-square rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--sf-surface)' }}
          >
            {product.thumbnail || product.images?.[0] ? (
              <Image
                src={product.thumbnail || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingCart size={64} style={{ color: 'var(--sf-border-strong)' }} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            {product.category && (
              <p className="text-sm mb-1" style={{ color: 'var(--sf-text-muted)' }}>
                {product.category.name}
              </p>
            )}
            <h1
              className="text-3xl font-bold leading-tight"
              style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}
            >
              {product.name}
            </h1>

            {/* Rating summary under title - strictly hidden when reviewsEnabled is false */}
            {isReviewsEnabled && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400 text-sm">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s}>{s <= Math.round(Number(averageRating)) ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="text-xs font-semibold" style={{ color: 'var(--sf-text)' }}>
                  {totalReviews > 0
                    ? `${averageRating} (${totalReviews} ${totalReviews === 1 ? 'review' : 'reviews'})`
                    : 'No reviews yet'}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold" style={{ color: 'var(--sf-text)' }}>
              {formatPrice(product.price, currency)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-lg line-through" style={{ color: 'var(--sf-text-muted)' }}>
                {formatPrice(product.compareAtPrice, currency)}
              </span>
            )}
          </div>

          {product.description && (
            <p style={{ color: 'var(--sf-text-muted)' }}>{product.description}</p>
          )}

          <div className="flex gap-3">
            <div
              className="flex items-center rounded-lg overflow-hidden"
              style={{ border: '1px solid var(--sf-border)' }}
            >
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:opacity-70"
                style={{ color: 'var(--sf-text)' }}
              >
                −
              </button>
              <span className="px-4 py-2 text-sm font-medium" style={{ color: 'var(--sf-text)' }}>
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 hover:opacity-70"
                style={{ color: 'var(--sf-text)' }}
              >
                +
              </button>
            </div>
            <button
              onClick={() =>
                add({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: qty,
                  image: product.thumbnail || product.images?.[0],
                  slug: product.slug,
                })
              }
              className="sf-btn-primary flex-1"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <button
              onClick={() => toggle(product.id)}
              className="p-3 rounded-lg"
              style={{
                border: '1px solid var(--sf-border)',
                color: wishlisted ? 'var(--sf-error)' : 'var(--sf-text-muted)',
              }}
            >
              <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section - completely hidden when store owner disables reviews in CMS */}
      {isReviewsEnabled && (
        <div className="mt-16 pt-12 border-t" style={{ borderColor: 'var(--sf-border)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}
              >
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-amber-400 text-sm">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s}>{s <= Math.round(Number(averageRating)) ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="text-xs font-medium" style={{ color: 'var(--sf-text-muted)' }}>
                  {totalReviews > 0
                    ? `${averageRating} out of 5 stars (${totalReviews} ${totalReviews === 1 ? 'review' : 'reviews'})`
                    : 'No reviews yet'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowReviewForm(!showReviewForm);
                setSubmitSuccess(false);
                setSubmitError(null);
              }}
              className="sf-btn-primary px-5 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-2"
            >
              <MessageSquare size={16} />
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>

          {submitSuccess && (
            <div className="mb-8 p-4 rounded-xl flex items-start gap-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 size={20} className="shrink-0 mt-0.5 text-emerald-600" />
              <div>
                <p className="font-semibold text-sm">Thank you for your feedback!</p>
                <p className="text-xs mt-0.5 opacity-90">
                  Your review has been submitted successfully and is currently pending moderation.
                  It will appear on this page once approved by the store owner.
                </p>
              </div>
            </div>
          )}

          {showReviewForm && (
            <form
              onSubmit={handleSubmitReview}
              className="mb-10 p-6 rounded-2xl border space-y-4"
              style={{ backgroundColor: 'var(--sf-surface)', borderColor: 'var(--sf-border)' }}
            >
              <h3 className="text-lg font-bold" style={{ color: 'var(--sf-text)' }}>
                Write Your Customer Review
              </h3>

              {submitError && (
                <div className="p-3 rounded-lg text-xs bg-rose-50 text-rose-700 border border-rose-200">
                  {submitError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--sf-text)' }}>
                  Overall Rating *
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setFormHoverRating(star)}
                      onMouseLeave={() => setFormHoverRating(0)}
                      onClick={() => setFormRating(star)}
                      className="text-2xl text-amber-400 focus:outline-none transition-transform hover:scale-110"
                    >
                      {star <= (formHoverRating || formRating) ? '★' : '☆'}
                    </button>
                  ))}
                  <span
                    className="text-xs font-semibold ml-2"
                    style={{ color: 'var(--sf-text-muted)' }}
                  >
                    {formHoverRating || formRating} of 5 stars
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--sf-text)' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none"
                    style={{
                      backgroundColor: 'var(--sf-bg)',
                      borderColor: 'var(--sf-border)',
                      color: 'var(--sf-text)',
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--sf-text)' }}>
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="e.g. jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none"
                    style={{
                      backgroundColor: 'var(--sf-bg)',
                      borderColor: 'var(--sf-border)',
                      color: 'var(--sf-text)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--sf-text)' }}>
                  Review Headline
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Outstanding quality and finish"
                  className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none"
                  style={{
                    backgroundColor: 'var(--sf-bg)',
                    borderColor: 'var(--sf-border)',
                    color: 'var(--sf-text)',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--sf-text)' }}>
                  Review Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="What did you like or dislike about this product? How did it fit your expectations?"
                  className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none"
                  style={{
                    backgroundColor: 'var(--sf-bg)',
                    borderColor: 'var(--sf-border)',
                    color: 'var(--sf-text)',
                  }}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border"
                  style={{ borderColor: 'var(--sf-border)', color: 'var(--sf-text)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sf-btn-primary px-5 py-2 rounded-xl text-xs font-semibold"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          )}

          {/* Approved Reviews List */}
          {approvedReviews.length === 0 ? (
            <div
              className="text-center py-12 px-4 rounded-2xl border"
              style={{ backgroundColor: 'var(--sf-surface)', borderColor: 'var(--sf-border)' }}
            >
              <p className="text-sm font-medium" style={{ color: 'var(--sf-text-muted)' }}>
                No customer reviews yet. Be the first to share your thoughts about this product!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {approvedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl border space-y-3"
                  style={{ backgroundColor: 'var(--sf-surface)', borderColor: 'var(--sf-border)' }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm" style={{ color: 'var(--sf-text)' }}>
                        {rev.userName}
                      </span>
                      {rev.verified && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--sf-text-muted)' }}>
                      {new Date(rev.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex text-amber-400 text-xs">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s}>{s <= rev.rating ? '★' : '☆'}</span>
                    ))}
                  </div>

                  {rev.title && (
                    <h4 className="font-bold text-sm" style={{ color: 'var(--sf-text)' }}>
                      {rev.title}
                    </h4>
                  )}

                  <p className="text-sm leading-relaxed" style={{ color: 'var(--sf-text-muted)' }}>
                    {rev.comment}
                  </p>

                  {rev.adminReply && (
                    <div
                      className="mt-3 p-3.5 rounded-xl border text-xs space-y-1"
                      style={{ backgroundColor: 'var(--sf-bg)', borderColor: 'var(--sf-border)' }}
                    >
                      <span className="font-bold block" style={{ color: 'var(--sf-text)' }}>
                        Official Store Response
                      </span>
                      <p style={{ color: 'var(--sf-text-muted)' }}>{rev.adminReply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
