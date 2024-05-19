window.addEventListener("DOMContentLoaded", (function(e) {
    window.$scope = window.$scope || {
        resources: {
            methods: {}
        }
    },
    window.$scope.resources.methods.filter = function() {
        // First filter based on sectors, topics, and types
        this.filtered_resources = _.filter(this.resources, (resource) => {
            if (this.filters.sectors.length === 0 && this.filters.topics.length === 0 && this.filters.types.length === 0) {
                return true;
            }
    
            let hasSectors = this.filters.sectors.length === 0 || _.intersection(resource.sectors, this.filters.sectors).length > 0;
            let hasTopics = this.filters.topics.length === 0 || _.intersection(resource.topics, this.filters.topics).length > 0;
            let hasTypes = this.filters.types.length === 0 || _.intersection(resource.types, this.filters.types).length > 0;
    
            return hasSectors && hasTopics && hasTypes;
        });
    
        console.log("start1");
        console.log(this.filtered_resources);
        console.log("end1");
    
        // Further filter based on searchText
        this.filtered_resources = this.filtered_resources.filter((resource) => {
            let searchText = this.filters.searchText.toLowerCase();
            return resource.title.toLowerCase().includes(searchText) ||
                   resource.description.toLowerCase().includes(searchText) ||
                   resource.types.toString().toLowerCase().includes(searchText) ||
                   resource.topics.toString().toLowerCase().includes(searchText) ||
                   resource.sectors.toString().toLowerCase().includes(searchText);
        });
    }
    ,
    window.$scope.resources.methods.searchQueryParams = function(key) {
        let params = new URLSearchParams(location.search);
        if (console.log(params.getAll(key) + " r"),
        params.has(key) && params.getAll(key).length > 0) {
            let values = params.get(key).split(",");
            for (let i = 0; i < values.length; i++)
                if (key === "topics") {
                    this.filters.topics.push(values[i]);
                    this.filters.types.push(values[i]);
                    this.filters.sectors.push(values[i]);
                }
            }
    }
    ,
    window.$scope.resources.methods.routingHandler = function() {
        this.searchQueryParams("sectors"),
        this.searchQueryParams("topics"),
        this.searchQueryParams("types"),
        this.filter()
    }
    ,
    window.$scope.resources.methods.loadMoreTrigger = function() {
        this.limit = this.limit + this.increment
    }
    ,
    window.$scope.resources.methods.sectorFilter = function(sector) {
        var foundit = !1;
        _.forEach(this.filters.sectors, (function(v, i) {
            v == sector && (foundit = !0)
        }
        )),
        foundit || this.filters.sectors.push(sector),
        foundit && (this.filters.sectors = _.filter(this.filters.sectors, (function(t) {
            return t !== sector
        }
        ))),
        this.locationChange("sectors", this.filters.sectors.join()),
        this.titleFilter(),
        this.filter()
    }
    window.$scope.resources.methods.topicFilter = function(topic) {
        var foundit = !1;
        _.forEach(this.filters.topics, (function(v, i) {
            v == topic && (foundit = !0)
        }
        )),
        foundit || this.filters.topics.push(topic),
        foundit && (this.filters.topics = _.filter(this.filters.topics, (function(t) {
            return t !== topic
        }
        ))),
        this.locationChange("topics", this.filters.topics.join()),
        this.titleFilter(),
        this.filter()
    }
    ,
    window.$scope.resources.methods.titleFilter = function(title) {
        console.log("trigger= " + this.searchtitle),
        this.filters.searchText = this.searchtitle,
        this.filter()
    }
    ,
    window.$scope.resources.methods.typeFilter = function(type) {
        var foundit = !1;
        _.forEach(this.filters.types, (function(v, i) {
            v == type && (foundit = !0)
        }
        )),
        foundit || this.filters.types.push(type),
        foundit && (this.filters.types = _.filter(this.filters.types, (function(t) {
            return t !== type
        }
        ))),
        this.locationChange("types", this.filters.types.join()),
        this.titleFilter(),
        this.filter()
    }
    ,
    window.$scope.resources.methods.resetFilters = function() {
        this.filters = {
            types: [],
            topics: [],
            sectors: [],
            searchText: ""
        },
        this.searchtitle = "",
        this.filter(),
        history.replaceState(void 0, void 0, window.location.pathname),
        this.limit = this.increment
    }
    ,
    window.$scope.resources.methods.locationChange = function(key, val) {
        let params = new URLSearchParams(location.search);
        if ("" != val) {
            params.set(key, val);
            let newUrl = window.location.pathname + "?" + params.toString();
            history.replaceState(void 0, void 0, newUrl)
        } else
            params.delete(key),
            "" != params.toString() ? history.replaceState(void 0, void 0, window.location.pathname + "?" + params) : history.replaceState(void 0, void 0, window.location.pathname)
    }
    ,
    window.$scope.resources.methods.toggleMobileFilters = function() {
        this.mobileFiltersActive && $(".filter-mobile-filters-wrapper").animate({
            left: "1000px"
        }, (function() {
            $(".filter-mobile-filters-wrapper").css({
                height: "0"
            })
        }
        )),
        this.mobileFiltersActive || ($(".filter-mobile-filters-wrapper").css({
            height: "auto"
        }),
        $(".filter-mobile-filters-wrapper").animate({
            left: window.innerWidth - 287 + "px"
        })),
        this.mobileFiltersActive = !this.mobileFiltersActive
    }
    ,
    window.$scope.resources.methods.isIeCheck = function() {
        let ua = navigator.userAgent;
        return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1
    }
    ;
    new Vue({
        el: "#app",
        data: {
            searchtitle: "",
            resources: window.resources,
            types: window.types,
            topics: window.topics,
            sectors: window.sectors,
            filtered_resources: this.resources,
            filters: {
                topics: [],
                types: [],
                sectors: [],
                searchText: ""
            },
            increment:3,
            limit: 6,
            mobileFiltersActive: !1,
            isIe: this.isIeCheck
        },
        methods: window.$scope.resources.methods,
        created: function() {
            this.routingHandler()
        },
        delimiters: ["{!!", "!!}"]
    })
}
))

$(document).ready(function(){

    $('.filter-trigger').click(function(){
        $(this).next().slideToggle(250);
    });
    $('.resources-wrapper .topic-filter').click(function(){
        let itemText = $(this).text();
        $(this).parent().slideToggle(250);
        $(this).siblings().removeClass('active');
        $('.topic-filter-wrapper .filter-trigger').html(itemText);
    });

    $('.resources-wrapper .type-filter').click(function(){
        let itemText = $(this).text();
        $(this).parent().slideToggle(250);
        $(this).siblings().removeClass('active');
        $('.type-filter-wrapper .filter-trigger').html(itemText);
    });

    $('button.filter-item.topics-filter:first-child').click(function(){
        let itemText = $(this).text();
        $('.topics-filter-wrapper .filter-trigger').html(itemText);
        $(this).siblings().removeClass('active');
        $(this).parent().slideUp(250);
    });
});
