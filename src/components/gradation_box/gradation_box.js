import './gradation_box.css'

export default function GradationBox() {
    return(
        <div className='gradation'>
            <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%'}}>
                <div className='gradation_box'>
                    <div className='logo-container'>
                        <img src="/assets/img/logo_black.png" />
                    </div>
                    <div style={{marginLeft: '20%'}}>
                        <div style={{color: '#F8F9FF'}}>부산대</div>
                        <div style={{color: '#0B0039'}}>알리미</div>
                    </div>
                    <div className='slogan'>여러분의 소중한 시간을 지켜드리는</div>
                </div>
            </div>
        </div>
    );
}