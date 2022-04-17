import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allemgth : any =[];
  public alerts: Array<any> = [];
  public sliders: Array<any> = [];
  course1 : any =[];
  course2: any =[];
  course3: any =[];
  course4: any =[];
  course5: any =[];
  course6: any =[];
  course7: any =[];
  users: any =[];
  f:any =[];
  toggleProBanner(event) {
    console.log("123");
    event.preventDefault();
    document.querySelector('body').classList.toggle('removeProbanner');
  }

  constructor(private firestore: AngularFirestore,) { 
    this.sliders.push(
      {
          imagePath: 'assets/images/clg/nik11.jpg',
          
          label: 'We are committed to overall development of our students with very sincere and careful attitude..'
      },
      {
          imagePath: 'assets/images/clg/acpce13.png',
          
          label: 'Learners can study on their own time and at their own pace',
      },
      {
          imagePath: 'assets/images/clg/nik12.jpg',
          label: 'Study a recognised qualification with the online learning experts',
           
      }
  );

  this.alerts.push(
      {
          id: 1,
          type: 'success',
          message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptates est animi quibusdam praesentium quam, et perspiciatis,
          consectetur velit culpa molestias dignissimos
          voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
      },
      {
          id: 2,
          type: 'warning',
          message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptates est animi quibusdam praesentium quam, et perspiciatis,
          consectetur velit culpa molestias dignissimos
          voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
      }
  );
  }

  ngOnInit() {

    

    this.getcoursedetails1().subscribe((res) =>{

      this.course1 = (res as any).map((e) =>{
        return {
                ...e['payload'].doc.data() as {},
                id: e['payload'].doc.id
             } 
      })
            
    })

    this.getcoursedetails2().subscribe((res) =>{

      this.course2 = (res as any).map((e) =>{
        return {
                ...e['payload'].doc.data() as {},
                id: e['payload'].doc.id
             } 
      })
      
    })

    this.getcoursedetails3().subscribe((res) =>{

      this.course3 = (res as any).map((e) =>{
        return {
                ...e['payload'].doc.data() as {},
                id: e['payload'].doc.id
             } 
      })
      
    })
    

    this.getcoursedetails4().subscribe((res) =>{

      this.course4 = (res as any).map((e) =>{
        return {
                ...e['payload'].doc.data() as {},
                id: e['payload'].doc.id
             } 
      })
      
    })

    this.getcoursedetails5().subscribe((res) =>{

      this.course5 = (res as any).map((e) =>{
        return {
                ...e['payload'].doc.data() as {},
                id: e['payload'].doc.id
             } 
      })
      
    })

    this.getcoursedetails6().subscribe((res) =>{

      this.course6 = (res as any).map((e) =>{
        return {
                ...e['payload'].doc.data() as {},
                id: e['payload'].doc.id
             } 
      })
      
    })

    this.getcoursedetails7().subscribe((res) =>{

      this.course7 = (res as any).map((e) =>{
        return {
                ...e['payload'].doc.data() as {},
                id: e['payload'].doc.id
             } 
      })
      
    })


    
    this.getuserdetails().subscribe((res) =>{

      this.users = (res as any).map((e) =>{
        return {
                ...e['payload'].doc.data() as {},
                id: e['payload'].doc.id
             } 
      })
      
    })

    this.feeds().subscribe((res) =>{

      this.f = (res as any).map((e) =>{
        return {
                ...e['payload'].doc.data() as {},
                id: e['payload'].doc.id
             } 
      })
      console.log(this.f.length);
    })

  
    
  }

  feeds() {
    // return this.firestore.collection("user", ref => ref.orderBy('createdAt', 'asc')).snapshotChanges();
    return this.firestore.collection("feedbacks").snapshotChanges()

  }



  getuserdetails() {
    // return this.firestore.collection("user", ref => ref.orderBy('createdAt', 'asc')).snapshotChanges();
    return this.firestore.collection("user").snapshotChanges()

  }

  
  getcoursedetails1() {
    return this.firestore.collection("course/INFORMATION TECHNOLOGY/coursedetails").snapshotChanges();

  }

  getcoursedetails2() {
    return this.firestore.collection("course/MECHANICAL ENGINEERING/coursedetails").snapshotChanges();

  }

  getcoursedetails3() {
    return this.firestore.collection("course/COMPUTER ENGINEERING/coursedetails").snapshotChanges();

  }

  getcoursedetails4() {
    return this.firestore.collection("course/ELECTRICAL ENGINEERING/coursedetails").snapshotChanges();

  }

  getcoursedetails5() {
    return this.firestore.collection("course/ELECTRONIC ENGINEERING/coursedetails").snapshotChanges();

  }

  getcoursedetails6() {
    return this.firestore.collection("course/ELECTRONICS AND TELECOMMUNICATION ENGINEERING/coursedetails").snapshotChanges();

  }

  
  getcoursedetails7() {
    return this.firestore.collection("course/INSTRUMENTATION ENGINEERING/coursedetails").snapshotChanges();

  }


  date: Date = new Date();

  visitSaleChartData = [{
    label: 'CHN',
    data: [20, 40, 15, 35, 25, 50, 30, 20],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'USA',
    data: [40, 30, 20, 10, 50, 15, 35, 40],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'UK',
    data: [70, 10, 30, 40, 25, 50, 15, 30],
    borderWidth: 1,
    fill: false,
  }];

  visitSaleChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  visitSaleChartOptions = {
    responsive: true,
    legend: false,
    scales: {
        yAxes: [{
            ticks: {
                display: false,
                min: 0,
                stepSize: 20,
                max: 80
            },
            gridLines: {
              drawBorder: false,
              color: 'rgba(235,237,242,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            }
        }],
        xAxes: [{
            gridLines: {
              display:false,
              drawBorder: false,
              color: 'rgba(0,0,0,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            },
            ticks: {
                padding: 20,
                fontColor: "#9c9fa6",
                autoSkip: true,
            },
            categoryPercentage: 0.4,
            barPercentage: 0.4
        }]
      }
  };

  visitSaleChartColors = [
    {
      backgroundColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ],
      borderColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ],
      borderColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ],
      borderColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ]
    },
  ];

  trafficChartData = [
    {

      data: [this.f.length, 3, 4],
    }
  ];

  trafficChartLabels = ["Student Count", "Course Count", "Feedback Count"];

  trafficChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
    legend: false,
  };

  trafficChartColors = [
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(132, 217, 210, 1)'
      ],
      borderColor: [
        'rgba(177, 148, 250, .2)',
        'rgba(254, 112, 150, .2)',
        'rgba(132, 217, 210, .2)'
      ]
    }
  ];

  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
}
}
