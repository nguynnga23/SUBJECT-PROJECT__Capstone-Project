from itemadapter import ItemAdapter

class ArticlePipeline:
    def _clean_title(self, adapter):
        title = adapter.get('title', '')
        cleaned_title = title.replace('\r\n', ' ').strip()
        adapter['title'] = cleaned_title
    
        
    def _summarize_text(self, adapter, spider):
        
        adapter["summary"] = "" 

    
    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        self._clean_title(adapter)
        self._summarize_text(adapter, spider)

        return item 

