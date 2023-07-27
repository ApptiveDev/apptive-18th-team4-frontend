import './gradation_box.css'

export default function GradationBox() {
    return(
        <div className='gradation'>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '74.38px'}}>
                <div className='logo' style={{width: '538px'}}>
                    <img src="/assets/img/logo_black.png" />
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className='gradation_box'>
                    <div style={{marginLeft: '66px', whiteSpace: 'pre-line'}}>
                        <div style={{color: '#F8F9FF', marginTop: '56px', height: '100px'}}>PNU</div>
                        <div style={{color: '#0B0039'}}>Allime</div>
                    </div>
                    <div className='slogan'>여러분의 소중한 시간을 지켜드리는</div>
                </div>
            </div>
        </div>
    );
}