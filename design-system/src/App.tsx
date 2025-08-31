// design-system/src/App.tsx (자체 뷰)
import React from 'react';
import Button from './components/Button';
import Card from './components/Card';
import './styles/tailwind.css';

const App: React.FC = () => {
    return (
        <div className='p-8 space-y-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-bold text-gray-800'>디자인 시스템 뷰</h1>
            <p className='text-lg text-gray-600'>이 컴포넌트들은 다른 프로젝트에서 사용될 수 있습니다.</p>
            <div className='flex space-x-4'>
                <Button onClick={() => alert('버튼이 클릭되었습니다!')}>기본 버튼</Button>
            </div>
            <Card title='예시 카드'>이 카드는 디자인 시스템에서 가져온 것입니다.</Card>
        </div>
    );
};

export default App;
