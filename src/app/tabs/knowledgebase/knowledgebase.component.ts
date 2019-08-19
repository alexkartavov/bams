import { Component, OnInit } from '@angular/core';
import { FaqDataService } from 'src/app/_services/faq-data.service';
import { FaqModel } from 'src/app/models/faq-model';
import { KnowledgebaseDataSource } from './knowledgebase-datasource';
// import { faqData } from '../../_services/test-data/data.faq';
import { ExportService } from 'src/app/_services/export.service';
import { ProfileService } from 'src/app/_services/profile.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-knowledgebase',
  templateUrl: './knowledgebase.component.html',
  styleUrls: ['./knowledgebase.component.scss']
})
export class KnowledgebaseComponent implements OnInit {

  public dataSource: KnowledgebaseDataSource;
  public data: any[];
  public topics: string[];
  public topicsGroup: any;
  public articles: FaqModel[];
  public currentTopic: string;

  public searchBoxText = '';

  private topicClasses: string[] = [];

  constructor(private faqDataService: FaqDataService,
    private exportService: ExportService,
    private profileService: ProfileService,
    private auth: AuthService) {
    this.topics = [];
    this.dataSource = new KnowledgebaseDataSource(faqDataService);
  }

  ngOnInit() {
    this.dataSource.connect().subscribe((data) => {
      // if (!data || data.length === 0) {
      //   this.data = faqData;
      // } else {
        this.data = data;
      // }

      const groupBy = function(xs, key) {
          return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        };
      this.topicsGroup = groupBy(this.data, 'topic');
      this.topics = [];
      for (const key in this.topicsGroup) {
        if (this.topicsGroup.hasOwnProperty(key)) {
          this.topics.push(key);
        }
      }

      const topic = this.profileService.get('knowledgebase.currentTopic') || this.topics[0];
      this.setCurrentTopic(topic);
    });
    this.refresh();
  }

  refresh() {
    const params = {
      search: this.searchBoxText ? this.searchBoxText : null
    };
    this.dataSource.loadFaqs(params);
  }

  search(text) {
    this.searchBoxText = text;
    this.refresh();
  }

  setCurrentTopic(topic) {
    if (!topic || !this.topicsGroup || !this.topicsGroup[topic]) {
      return;
    }
    this.currentTopic = topic;
    this.profileService.set('knowledgebase.currentTopic', topic);
    this.articles = [];
    this.topicsGroup[this.currentTopic].forEach((item) => {
      if (item) {
        this.articles.push(item);
      }
    });
  }

  topicClass(index) {
    if (this.topics[index] === this.currentTopic) {
      return 'bg-lightgray shadow';
    }
    if (!this.topicClasses[index]) {
      return '';
    }
    return this.topicClasses[index];
  }

  mouseOvered(index) {
    this.topicClasses[index] = 'shadow';
  }

  mouseOuted(index) {
    this.topicClasses[index] = '';
  }

  topicClicked(index) {
    this.setCurrentTopic(this.topics[index]);
  }

  topicIcon(topic) {
    switch (topic) {
      case 'Merchant Management':
        return '../../../assets/kb_merchantmgmt.png';
      case 'User Access Management':
      return '../../../assets/kb_useraccessmgmt.png';
      case 'Reporting':
      return '../../../assets/kb_reporting.png';
      default:
      return '../../../assets/kb_general.png';

      // case 'Merchant Management':
      //   return 'store';
      // case 'User Access Management':
      //   return 'people';
      // case 'Reporting':
      //   return 'bar_chart';
      // default:
      //   return 'info';
    }
  }

  faqAdded(event) {
    this.refresh();
  }

  startDownload() {
    this.exportService.exportXlsxFile(
      {
        Topic: 'topic',
        Question: 'question',
        Answer: 'answer'
      },
      this.data, 'faqExport', 'FAQs');
  }

  print() {
    this.exportService.print('FAQ',
      {
        Topic: 'topic',
        Question: 'question',
        Answer: 'answer'
      },
      this.data);
  }

  isAdmin(): boolean {
    return this.auth.getUserRole() === Role.Admin;
  }

}
