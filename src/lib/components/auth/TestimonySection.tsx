'use client';
import Image from 'next/image';
import testimonyPerson from '@/assets/david-yakas.png';
import testimonyCard from '@/assets/testimony-card.png';
import { authStore } from '@/lib/stores/auth';
import Icon from '@/lib/components/common/Icon';
import { TestimonyMode } from '@/lib/stores/auth';

export const TestimonySection = ({ defaultMode }: { defaultMode?: TestimonyMode }) => {
    const { testimonyMode } = authStore();
    if ((defaultMode || testimonyMode) === 'rating') {
        return (
            <section className="auth__testimony">
                <h2>Get the help you need with your response document</h2>
                <div className="auth__testimony__card">
                    <Image alt={''} src={testimonyCard} className="auth__testimony__image--card" />
                    <div className="auth__testimony__card__stat">
                        <span className="auth__testimony__card__stat__icon">
                            <Icon.Users />
                        </span>
                        <div className="auth__testimony__card__stat__details">
                            <h6>Rated 5/5</h6>
                            <small>from 200 real reviews</small>
                        </div>
                    </div>
                    <div className="auth__testimony__card__review">
                        <div className="auth__testimony__card__review__rating">
                            <Icon.Star />
                            <Icon.Star />
                            <Icon.Star />
                            <Icon.Star />
                            <Icon.Star />
                        </div>
                        <span>“TenderRelief gave me the support that I needed. They changed my life.”</span>
                    </div>
                </div>
                <div className="auth__testimony__checks">
                    <span>Lorem ispum</span>
                    <span>Lorem ispum</span>
                    <span>Lorem ispum</span>
                </div>
            </section>
        );
    }

    return (
        <section className="auth__testimony">
            <h3>
                “I felt complete confidence working with Tender Relief, and they made me feel like I was the most important client on their
                to do list”
            </h3>
            <Image alt={''} src={testimonyPerson} className="auth__testimony__image--person" />
            <div className="auth__testimony__info">
                <h5>David Yakas</h5>
                <span>Director</span>
                <span>Wrapped Creations</span>
            </div>
        </section>
    );
};
