 'use client'
 import { React, useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
 import Footer from '@/app/components/footer'
 import Image from 'next/image'
 import Link from 'next/link'
 import EcoWarrior from '@/app/components/slider-eco-warriors'
 import Header_new from '@/app/components/header_new'
import Script from 'next/script'
import Impact from '@/app/walk-for-nature/impact'
import ImpactWater from '@/app/walk-for-water/impact'
import ImpactGic from '@/app/green-india-challenge/impact'
import axios from 'axios';
import Projectmap from '@/app/components/listProjectMap'
import '@/app/css/mapbox-gl.css'

export default function Home({ children }) {
  const apiRoute = process.env.API_ROUTE
  const userId = process.env.CLIENT_ID;

  const[data, setData] = useState()
  const [toggleImpact, setToggleImpact] = useState({
    nature:false,
    water:true,
    gic:false
  })
  const [projectlist, setProjectlist] = useState([])
  const changeImpact =(value)=>{
     if(value == 'nature'){
      setToggleImpact({...toggleImpact, nature:true, water:false, gic:false})
      console.log('nature')
     }
     else if(value == 'water'){
      setToggleImpact({...toggleImpact, nature:false, water:true, gic:false})
      console.log('water')
     }
     else if(value == 'gic'){
      setToggleImpact({...toggleImpact, nature:false, water:false,gic:true})
      console.log('gic')
     }
  }
  useEffect(() => {
    AOS.init();
    var myHeaders = new Headers();
    
        myHeaders.append("Content-Type", "application/json");
        getBannerDetail();
        getProjectDetail();

              function getBannerDetail(){
                var raw = JSON.stringify({  "userId": 'IGM_USER' });
                var requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow'  };
                fetch(`${apiRoute}/webbannerdetail`, requestOptions)
                .then(response => response.json())
                .then((result) => {
                setData(result.Data) 
                // console.log(result.Data)
                })
              }

              function getProjectDetail(){
                axios.post(`${apiRoute}/listproject`, {  "userId": userId }, { headers: { 'Content-Type': 'application/json' }  }
              )
            .then(function (response) {
              setProjectlist(response.data.Data)
            })
            //.then(setLoading(false))
              }
 }, [apiRoute, userId])
  return (
    <>
        
<div id="handler-first"></div>

<div className='header-wrap'>

    <Header_new />
	<Script src={`/js/animate.js`} strategy='afterInteractive'/>
    </div>


    <section className="new-sec1">
     <div className='new-sec1-shadow'></div>
     <div className='new-sec1-img'> 
       {data?.desktopImage ? <Image src={data?.desktopImage} alt="igniting minds banner" fill className='for-desktop'/> : '' }
      {data?.mobileImage ? <Image src={data?.mobileImage} alt="igniting minds banner" fill className='for-mobile'/> : '' }
      </div>
     <div className='new-sec1-txt'>
        <div className='new-sec1-head'>
          {/* An Ignited Mind can <br className='for-desktop'/> change our <VerticalSlider /> */}
          {data?.title}
      </div>

      
        <div className='new-sec1-btn'>
           {data ? <Link href={data ? data.url : '/'} className='new-btn'>Explore Projects</Link> : ''} 
        </div>
     </div>
    </section>

   <section className='new-sec2'>
    <div className='container'>
        <div className='col-md-12'>
            <div className='new-sec2-head sec-head'>Our initiatives</div>
        </div>
     <div className=' row'>
        
        

        <div className='col-md-4'>
        <div className='new-sec2-box'>
            <div className='new-sec2-img'>
              <Image src="/images/walk-for-water-thumb.png" fill alt="walk for water"  className='for-desktop'/>
              <Image src="/images/walk-for-water-thumb.png" fill alt="walk for water"  className='for-mobile'/>
              </div>
            <div className='new-sec2-txt'>
                <div className='new-sec2-txt-head'>Walk for Water</div>
                <div className='new-sec2-txt-para'>Walk For Water sparks a global movement, uniting people for responsible water stewardship, fostering a shared sense of global responsibility.</div>
<Link href="/walk-for-water" className='new-btn'>Learn More</Link>
            </div>
        </div>
        </div>

        <div className='col-md-4'>
        <div className='new-sec2-box'>
            <div className='new-sec2-img'>
              <Image src="/images/home-sec5.png" fill alt="green india challenge"  className='for-desktop'/>
              <Image src="/images/home-sec5.png" fill alt="green india challenge"  className='for-mobile'/>
            </div>
            <div className='new-sec2-txt'>
                <div className='new-sec2-txt-head'>Green India Challenge</div>
                <div className='new-sec2-txt-para'>Hara Hai Toh Bhara Hai&#34; aims to boost India&#39;s green cover, with 95 million seedlings planted, supported by figures like Prabhas, Sachin Tendulkar, and others.</div>
                <Link href="/green-india-challenge" className='new-btn'>Learn More</Link>
            </div>
        </div>
        </div>

        <div className='col-md-4'>
        <div className='new-sec2-box'>
            <div className='new-sec2-img'>
              <Image src="/images/home-sec4.png" fill alt="walk for nature" className='for-desktop'/>
              <Image src="/images/home-sec4.png" fill alt="walk for nature" className='for-mobile'/>
            </div>
            <div className='new-sec2-txt'>
                <div className='new-sec2-txt-head'>Walk for Nature</div>
                <div className='new-sec2-txt-para'>Step into a greener future with Walk for Nature. Earn an eco-coin for every step. Track in our app. Achieve daily goals for a healthier you and planet.</div>
                <Link href="/walk-for-nature" className='new-btn'>Learn More</Link>
            </div>
           
        </div>
        </div>

        

       

     </div>
     </div>
   </section>

   <section className="home-sec2">
  <div className="container">
   <div className="home-sec2-box" style={{backgroundColor:'#fff'}}>
    <div className="row">
      <div className='col-md-12'>
      <h2 className='sec-head'>Who We Are</h2>
      </div>
      <div className="col-md-5 for-mobile">
            <div className="home-sec2-img">
                <Image src="/images/home-sec2-img.jpg" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="mission"/>
            </div>
        </div>
        <div className="col-md-7">
            <div className="home-sec2-txt">
                <p>Founded in the spirit of Dr. APJ Abdul Kalam&#39;s visionary ethos, IGNITING MINDS has become a beacon of hope in ecological conservation. With a guiding principle that “Water is Religion, Nature is God, and Planting Trees is Our Prayer”, we strive to unite technology with tradition to restore our planet to its pristine glory.</p><p> Endorsed by President Smt. Draupadi Murmu Ji and Prime Minister Shri Narendra Modi Ji, our campaigns have dramatically influenced India&#39;s environmental and water conservation efforts, leading to over 18,000 rainwater harvesting structures and 179.88 million trees planted as on 31 Dec 2023.</p>
               <Link href="/Our-story" className="btn-circle" style={{display:'inline-block',marginTop:'25px'}}>Learn More</Link>
            </div>
        </div>
        <div className="col-md-5 for-desktop">
            <div className="home-sec2-img">
                <Image src="/images/home-sec2-img.jpg" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="mission"/>
            </div>
        </div>
    </div>
   </div>
  </div>
</section>

<section className='what-we-do'>
  <div className='container'>
    <div className='row'>
      <div className='col-md-12'>
        <div className='what-we-do-head sec-head'>What We Do</div>
      </div>
      <div className='col-md-12'>
        <div className='what-we-do-cover'>

          <div className='what-we-do-box' data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="500" data-aos-offset="100" data-aos-delay="0">
              <div className='what-we-do-img'><Image src="/images/environmental-stewardship.png" alt="what we do" fill/></div>
              <div className='what-we-do-txt'>Environmental Stewardship</div>
          </div>
          <div className='what-we-do-box' data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="500" data-aos-offset="100" data-aos-delay="500">
              <div className='what-we-do-img'><Image src="/images/educational-empowerment.png" alt="what we do" fill/></div>
              <div className='what-we-do-txt'>Educational Empowerment</div>
          </div>
          <div className='what-we-do-box' data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="500" data-aos-offset="100" data-aos-delay="1000">
              <div className='what-we-do-img'><Image src="/images/tree-care.png" alt="what we do" fill/></div>
              <div className='what-we-do-txt'>Nurtured & Geo tagged trees</div>
          </div>
          <div className='what-we-do-box' data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="500" data-aos-offset="100" data-aos-delay="1500">
              <div className='what-we-do-img'><Image src="/images/community-enagement.png" alt="what we do" fill/></div>
              <div className='what-we-do-txt'>Community Engagement</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

<section className="our-app">
  <div className='container'>
    <div className='row'>
      <div className='col-md-12'>
        <div className='our-app-head sec-head'>Our App</div>
      </div>

      <div className='col-md-6'>
         <div className='our-app-cover left'>
          <div className='our-app-txt'>

            <div className='our-app-txt-box arrow-one'>
              <div className='our-app-txt-boxhead'>Walk for Water</div>
              <div className='our-app-txt-boxtxt'>Join the blue revolution. Conserve water through lifestyle changes and rainwater harvesting. Take the pledge, get certified, and make a difference today!</div>
            </div>

            <div className='our-app-txt-box arrow-two'>
              <div className='our-app-txt-boxhead'>Green India Challenge</div>
              <div className='our-app-txt-boxtxt'>Join the Green India Challenge and contribute to planting 1 Billion trees and increasing green cover across India. Plant a tree and join the change!</div>
            </div>
          </div>
          <div className='our-app-img'>
            <Image src="/images/mobile1.png" fill alt="what we do" />
          </div>
         </div>
      </div>

      <div className='col-md-6'>
         <div className='our-app-cover right'>
         <div className='our-app-img'>
            <Image src="/images/mobile2.png" fill alt="what we do" />
          </div>
          <div className='our-app-txt'>

            <div className='our-app-txt-box arrow-three'>
              <div className='our-app-txt-boxhead'>Walk for Nature</div>
              <div className='our-app-txt-boxtxt'>Track your daily steps and win tree saplings for you or your family on your completing step goals. Good Health Good Nature!</div>
            </div>

            <div className='our-app-txt-box arrow-four'>
              <div className='our-app-txt-boxhead'>Impact Calculator</div>
              <div className='our-app-txt-boxtxt'>Know environmental impact of all your activity like carbon footprint, water footprint, land saved & plastic footprint</div>
            </div>
          </div>
          
         </div>
      </div>
    </div>
  </div>
</section>

    <div className="desktop-div">



<section className='new-middle-img'>
    <div className='container' style={{position:'relative'}}>
        <div className='new-middle-img-img home-page-bg'></div>
        <div className='new-middle-cover'>
        <div className='row'>
            <div className='col-md-12'>
                <div className='sec-head' oldclass="new-middle-img-head" style={{color:'#009933'}}>Our Impact</div>
            </div>
            <div className='col-md-12'>
              <div className='home-impact-tabs'>
                {/* <div className='home-impact-tab active' onClick={setToggleImpact({...toggleImpact , nature :true, water:false, gic:false})}>Walk for Nature</div> */}
                {/* <div className='home-impact-tab'  onClick={setToggleImpact({...toggleImpact , water: true, nature:false, gic:false})}>Walk for Water</div> */}
                {/* <div className='home-impact-tab' onClick={setToggleImpact({...toggleImpact , gic:true, nature:false, water:false})}>Green India Challenge</div> */}
                 
                <div className={toggleImpact.water ? 'home-impact-tab active' : 'home-impact-tab'} onClick={()=>changeImpact('water')} >Walk for Water</div> 
                 <div className={toggleImpact.gic ? 'home-impact-tab active' : 'home-impact-tab'} onClick={()=>changeImpact('gic')}>Green India Challenge</div>
                 <div className= {toggleImpact.nature ? 'home-impact-tab active' : 'home-impact-tab'}  onClick={()=>changeImpact('nature')}>Walk for Nature</div>
              </div>
            </div>

            <div className='col-md-12'>
               {toggleImpact.nature ? <Impact color="#009933"/> :''} 

               {toggleImpact.water ? <ImpactWater color="#0f86c8" margin="50px"/> :''}

                {toggleImpact.gic ? <ImpactGic color="#009933"/> : ''}
            </div>

        </div>
        </div>
    </div>
</section>


<section className=''>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                <div className="other-page-head"><h1 className='sec-head'>Our Projects</h1></div>
                </div>
                <div className='col-md-12'> 
                {projectlist.length > 0 ?  
                <Projectmap treeLoc={projectlist}/>
                 : ''} 
                </div>
              </div>
            </div>
</section>


<section className="home-sec8">
    <div className="container">
        <div className="home-sec8-box">
            <div className="row">
                <div className="col-md-12">
                    <div className=""><h2 className='sec-head'>Our Peripherals</h2></div>
                </div>
                <div className="col-md-12">
                   
				           <div className="home-sec8-box-list">
                        <EcoWarrior />
                    </div>
         </div>
            </div>
        </div>
    </div>
</section>



    </div>




    
    {children}
    <Footer />
    </>
  )
}
