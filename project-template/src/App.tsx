import React, { lazy, Suspense } from 'react';
import { Button as LocalButton, Card as LocalCard } from 'design-system';

// 개발 모드에서는 모듈 페더레이션으로 컴포넌트를 가져옵니다.
const RemoteButton = lazy(() => import('designSystem/Button'));
const RemoteCard = lazy(() => import('designSystem/Card'));

const App: React.FC = () => {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>템플릿 프로젝트</h1>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
                {/* Module Federation으로 로드된 컴포넌트 */}
                <div style={{ padding: '1rem', border: '2px solid #3b82f6', borderRadius: '0.5rem' }}>
                    <h2>Module Federation</h2>
                    <Suspense fallback={<div>Loading remote components...</div>}>
                        <RemoteButton onClick={() => alert('디자인 시스템 원격 버튼이 클릭되었습니다!')}>원격 버튼</RemoteButton>
                        <RemoteCard title='원격 카드'>이 카드는 런타임에 동적으로 로드됩니다.</RemoteCard>
                    </Suspense>
                </div>

                {/* npm 패키지로 로드된 컴포넌트 */}
                <div style={{ padding: '1rem', border: '2px solid #ef4444', borderRadius: '0.5rem' }}>
                    <h2>NPM 패키지</h2>
                    <LocalButton onClick={() => alert('디자인 시스템 로컬 버튼이 클릭되었습니다!')}>로컬 버튼</LocalButton>
                    <LocalCard title='로컬 카드'>이 카드는 빌드 시점에 포함됩니다.</LocalCard>
                </div>
            </div>
        </div>
    );
};

export default App;
